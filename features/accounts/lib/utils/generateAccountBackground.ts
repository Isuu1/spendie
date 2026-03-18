export const generateAccountBackground = (accountType: string) => {
  switch (accountType.toLowerCase()) {
    case "credit card":
      return "linear-gradient(263deg,rgba(56, 117, 187, 1) 0%, rgba(41, 73, 110, 1) 100%)";
    case "checking":
      return "linear-gradient(263deg,rgba(131, 92, 185, 1) 0%, rgba(75, 43, 122, 1) 100%)";
    case "savings":
      return "linear-gradient(263deg,rgba(1, 55, 92, 1) 0%, rgba(15, 32, 39, 1) 100%)";
    case "investment":
      return "linear-gradient(263deg,rgba(255, 153, 102, 1) 0%, rgba(112, 69, 52, 1) 100%)";
    default:
      return "linear-gradient(263deg,rgba(161, 47, 161, 1) 0%, rgba(82, 32, 82, 1) 100%";
  }
};
