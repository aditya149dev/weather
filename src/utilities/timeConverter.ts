export const convertUTCToLocal = (utcTimeStr: string, userTimeZone: string) => {
  const dummyDate = "1970-01-01 ";
  const utcDateString = `${dummyDate}${utcTimeStr} UTC`;

  const date = new Date(utcDateString);

  return date.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
    timeZone: userTimeZone,
  });
};
