import bcryptjs from "bcryptjs";

/**
 * Hashes a given value using bcrypt with a specified number of salt rounds.
 * If no salt rounds are provided, it defaults to 10 rounds.
 * 
 * @param value - The string value to be hashed.
 * @param saltRounds - The number of salt rounds to use in hashing (optional, defaults to 10).
 * @returns A Promise that resolves to the hashed value as a string.
 */
export const hashValue = async (value: string, saltRounds?: number) => {
  return await bcryptjs.hash(value, saltRounds || 10);
};

/**
 * Compares a plain value with a hashed value to check if they match.
 * If the comparison fails or an error occurs, it returns false.
 * 
 * @param value - The plain string value to be compared with the hashed value.
 * @param hashedValue - The hashed value to compare against.
 * @returns A Promise that resolves to a boolean indicating if the values match.
 */
export const compareValue = async (value: string, hashedValue: string) => {
  return await bcryptjs.compare(value, hashedValue).catch(() => false);
};
