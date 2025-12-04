export const generateAccountBackground = (accountType: string) => {
  switch (accountType.toLowerCase()) {
    case "credit card":
      return "#3875bb5d";
    case "checking":
      return "linear-gradient(263deg,rgba(131, 92, 185, 1) 0%, rgba(75, 43, 122, 1) 100%)";
    case "savings":
      return "#0f20277c";
    case "investment":
      return "#ff996673";
    default:
      return "#4343437a";
  }
};
