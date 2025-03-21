/**
 * Retrieves the value of an environment variable.
 * If the environment variable is not set, it returns a default value.
 * Throws an error if the environment variable is missing and no default value is provided.
 *
 * @param key - The name of the environment variable to retrieve.
 * @param defaultValue - The default value to return if the environment variable is not set (optional, defaults to an empty string).
 * @returns The value of the environment variable, or the default value if not set.
 * @throws Error if the environment variable is not defined and no default value is provided.
 */
export const getEnvVariable = (
  key: string,
  defaultValue: string = ""
): string => {
  const value = process.env[key] || defaultValue;
  if (value === undefined) {
    throw new Error(`Missing enviroment variable ${key}`);
  }
  return value;
};

/**
 * Returns the application's configuration by fetching environment variables
 * and providing defaults where applicable.
 */
const appConfig = () => ({
  NODE_ENV: getEnvVariable("NODE_ENV", "development"),
  ORIGIN: getEnvVariable("ORIGIN", "localhost"),
  PORT: getEnvVariable("PORT", "3001"),
  BASE_PATH: getEnvVariable("BASE_PATH", "/api/v1"),
  JWT: {
    SECRET: getEnvVariable("JWT_SECRET", "secret_token"),
  },
  RESEND: {
    API_KEY: getEnvVariable("RESEND_API_KEY"),
    SENDER_MAILER: getEnvVariable("RESEND_SENDER_MAILER"),
  },
});

export const config = appConfig();
