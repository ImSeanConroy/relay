import bcryptjs from "bcryptjs";

export const hashValue = async (value: string, saltRounds?: number) => {
  return await bcryptjs.hash(value, saltRounds || 10);
};

export const compareValue = async (value: string, hashedValue: string) => {
  return await bcryptjs.compare(value, hashedValue).catch(() => false);
};
