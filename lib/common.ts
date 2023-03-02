import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

/*
 * Ex:
 * - Mar 23
 * - Jan 1
 * - Oct 13, 2022
 */
export const formatDate = (date: string) => {
  const format =
    dayjs(date).year() === new Date().getFullYear() ? "MMM D" : "MMM D, YYYY";
  return dayjs(date).format(format);
};
