import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(relativeTime);

/**
 * Returns a human-readable “time since” string.
 * Examples: "2 days ago", "three weeks ago", "1 year ago"
 *
 * @param {Date | string | number} inputDate – any date parseable by dayjs
 * @param {boolean} [withoutSuffix=false] – if true, omits "ago"/"in"
 * @returns {string}
 */
export function timeSince(
  inputDate: Date | string | number,
  withoutSuffix = false
) {
  const dt = dayjs(inputDate);
  return dt.fromNow(withoutSuffix);
}

export default dayjs;
