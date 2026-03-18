"use client";

import React, { useMemo } from "react";
import { usePlaidItems } from "../hooks/usePlaidItems";
import { useAccounts } from "../hooks/useAccounts";
import { Account } from "../types/account";

const AccountsGrid = () => {
  const { data: accounts = [] } = useAccounts();
  const { data: items } = usePlaidItems();

  console.log("Plaid items in AccountsGrid:", items);
  console.log("Accounts in AccountsGrid:", accounts);

  const grouped = useMemo(() => {
    if (!accounts || !items) return [];

    return items.map((item) => ({
      ...item,
      accounts: accounts.filter(
        (acc: Account) =>
          acc.plaid_item_id === item.plaid_item_id && !acc.is_deleted,
      ),
    }));
  }, [accounts, items]);

  return (
    <div>
      {grouped.map((item) => (
        <div key={item.plaid_item_id}>
          <h4>{item.institution_name}</h4>
          <ul>
            {item.accounts.map((acc: Account) => (
              <li key={acc.id}>{acc.name}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default AccountsGrid;
