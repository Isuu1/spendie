import { jwtVerify, decodeProtectedHeader, importJWK } from "jose";
import { sha256 } from "js-sha256";

import plaidClient from "@/shared/lib/plaid";

type PlaidWebhookPayload = {
  iat: number;
  request_body_sha256: string;
};

export async function verifyPlaidWebhook(
  body: string,
  verificationHeader: string,
): Promise<boolean> {
  try {
    // Get the JWT header without verifying it yet
    const { kid, alg } = decodeProtectedHeader(verificationHeader);

    // Plaid webhooks must use ES256
    if (alg !== "ES256" || !kid) {
      return false;
    }

    // Get the public verification key from Plaid
    const response = await plaidClient.webhookVerificationKeyGet({
      key_id: kid,
    });

    const key = response.data.key;

    // Convert the JWK into a key that jose can use
    const publicKey = await importJWK(key, "ES256");

    // Verify:
    // - JWT signature
    // - token expiration / age
    const { payload } = await jwtVerify(verificationHeader, publicKey, {
      algorithms: ["ES256"],
      maxTokenAge: "5 min",
    });

    const webhookPayload = payload as unknown as PlaidWebhookPayload;

    // Hash the ORIGINAL raw request body
    const bodyHash = sha256(body);

    // Make sure the body hasn't been modified
    if (bodyHash !== webhookPayload.request_body_sha256) {
      return false;
    }

    return true;
  } catch (error) {
    console.error("Plaid webhook verification failed:", error);

    return false;
  }
}
