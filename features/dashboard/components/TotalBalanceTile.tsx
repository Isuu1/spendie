import React from "react";
import { accounts } from "@/data/accounts";

const TotalBalanceTile = () => {
  const formatGBP = (amount: number): string => {
    return amount.toLocaleString("en-GB", {
      // Use 'en-GB' for Great Britain Pound formatting
      style: "currency",
      currency: "GBP",
    });
  };

  const totalBalance = accounts.reduce((sum, currentAccount) => {
    // Ensure totalBalance is treated as a number (add safety check if needed)
    const balance =
      typeof currentAccount.totalBalance === "number"
        ? currentAccount.totalBalance
        : 0;
    return sum + balance;
  }, 0); // Initialize the sum to 0

  return (
    <>
      <p>Total balance: {formatGBP(totalBalance)}</p>
      {accounts.map((account) => (
        <div key={account.id}>
          <h4>{account.name}</h4>
          <p>Balance: {formatGBP(account.totalBalance)}</p>
        </div>
      ))}
    </>
  );
};

export default TotalBalanceTile;
