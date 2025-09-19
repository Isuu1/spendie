"use server";

import { getUserServer } from "../api/getUserServer";
import { accountDetailsSchema } from "../schemas/forms";
import { ChangeDetailsFormState } from "../types/forms";

export async function changeUserDetails(
  prevState: ChangeDetailsFormState,
  formData: FormData
): Promise<ChangeDetailsFormState> {
  const name = formData.get("name") as string;
  const surname = formData.get("surname") as string;
  const dob = formData.get("dob") as string;
  const email = formData.get("email") as string;

  try {
    const { user, error } = await getUserServer();

    if (error || !user) {
      console.error("Error fetching user:", error);
      return { success: false, user: null, error: "Failed to fetch user" };
    }

    const result = accountDetailsSchema.safeParse({
      name,
      surname,
      dob,
      email,
    });

    console.log("Validation result:", result);

    if (!result.success) {
      // Map Zod errors into field -> string[] format
      const fieldErrors: Record<string, string[]> = {};
      result.error.errors.forEach((err) => {
        const key = err.path[0] as string;
        if (!fieldErrors[key]) fieldErrors[key] = [];
        fieldErrors[key].push(err.message);
      });
      return { success: false, user: null, error: "Invalid data", fieldErrors };
    }

    return { success: true, user: user, error: null };
  } catch (error) {
    console.error("Error changing user details:", error);
    return { success: false, user: null, error: "An error occurred" };
  }
}
