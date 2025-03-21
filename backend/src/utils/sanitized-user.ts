/**
 * Removes sensitive information (e.g., password) from the user object.
 *
 * This function extracts the `password` field from the user object 
 * and returns a new object containing all other user properties.
 *
 * @param user - The user object that may contain sensitive fields.
 * @returns A new user object without the `password` field.
 */
export const sanitizedUser = (user: any) => {
  const { password, ...sanitizedUser } = user;
  return sanitizedUser;
};