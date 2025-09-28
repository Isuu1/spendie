// features/dashboard/lib/tilesMeta.ts
export const panelsMetaData = [
  { name: "Total Balance" },
  { name: "Accounts" },
  { name: "Recent transactions" },
] as const;

// Infer union type from names
export type PanelName = (typeof panelsMetaData)[number]["name"];
