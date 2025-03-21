/**
 * Returns a Date object representing the current time plus one hour.
 * 
 * @returns A Date object set to one hour from the current time.
 */
export const oneHourFromNow = () => {
  return new Date(Date.now() + 60 * 60 * 1000);
}

/**
 * Returns a Date object representing the current time plus one year.
 * This calculation assumes 365 days in a year, without accounting for leap years.
 * 
 * @returns A Date object set to one year from the current time.
 */
export const oneYearFromNow = () => {
  return new Date(Date.now() + 365 * 24 * 60 * 60 * 1000);
};
