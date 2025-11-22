export const getEmailProviderUrl = (email: string) => {
  const domain = email.split("@")[1];
  switch (domain) {
    case "gmail.com":
      return "https://mail.google.com/";
    case "yahoo.com":
      return "https://mail.yahoo.com/";
    case "outlook.com":
    case "hotmail.com":
    case "live.com":
      return "https://outlook.live.com/";
    default:
      return "mailto:${email}"; //If there is no match, return dafault provider
  }
};
