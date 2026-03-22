import dayjs from "dayjs";

const PREFIX = "Last updated: ";

export const lastUpdated = (syncedDate: string | null) => {
  if (!syncedDate) return `${PREFIX}N/A`;

  const now = dayjs();
  const lastSyncedAt = dayjs(syncedDate);
  const hours = now.diff(lastSyncedAt, "hour");
  const days = now.diff(lastSyncedAt, "day");
  const minutes = now.diff(lastSyncedAt, "minute");

  let message: string;
  if (minutes < 60)
    message = `${minutes} ${minutes === 1 ? "minute" : "minutes"} ago`;
  else if (hours < 24)
    message = `${hours} ${hours === 1 ? "hour" : "hours"} ago`;
  else if (days === 1) message = "Yesterday";
  else message = `${days} days ago`;

  return `${PREFIX}${message}`;
};
