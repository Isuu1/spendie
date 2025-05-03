import { Configuration, PlaidApi } from "plaid";

const configuration = new Configuration({
  basePath: `https://${process.env.PLAID_ENV}.plaid.com`,
  baseOptions: {
    headers: {
      "PLAID-CLIENT-ID": process.env.PLAID_CLIENT_ID,
      "PLAID-SECRET": process.env.PLAID_SECRET,
    },
  },
});

const plaidClient = new PlaidApi(configuration);

export default plaidClient;
