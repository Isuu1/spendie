export const generateAccountBackground = (accountType: string) => {
  switch (accountType.toLowerCase()) {
    case "credit card":
      return "#3875bb5d";
    case "checking":
      return "#835cb97e";
    case "savings":
      return "#0f20277c";
    case "investment":
      return "#ff996673";
    default:
      return "#4343437a";
  }
};
