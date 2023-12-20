import moment from "moment";

export function formatDate(
  dateInput: string | number | Date,
  hideFullTime?: boolean,
  show12HourFormat?: boolean
): string {
  if (!dateInput) return "";

  return hideFullTime
    ? moment(dateInput).format(DATE_FORMAT)
    : moment(dateInput).format(
        `${DATE_FORMAT} ${
          show12HourFormat ? TIME_12_HOUR_FORMAT : TIME_24_HOUR_FORMAT
        }`
      );
}

export const DATE_FORMAT = "MMM DD, YYYY";
export const YEAR_FORMAT = "YYYY";
export const MONTH_YEAR_FORMAT = "MMM, YYYY";
export const DAY_MONTH_FORMAT = "MMM DD";
export const TIME_24_HOUR_FORMAT = "HH:mm";
export const TIME_12_HOUR_FORMAT = "hh:mm A";
