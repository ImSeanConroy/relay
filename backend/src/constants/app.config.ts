export const getEnvVariable = (key: string, defaultValue: string = ""): string => {
  const value = process.env[key] || defaultValue;

  if (value === undefined) {
    throw new Error(`Missing enviroment variable ${key}`);
  }

  return value;
};

const appConfig = () => ({
  NODE_ENV: getEnvVariable("NODE_ENV", "development"),
  ORIGIN: getEnvVariable("ORIGIN", "localhost"),
  PORT: getEnvVariable("PORT", "3001"),
  BASE_PATH: getEnvVariable("BASE_PATH", "/api/v1"),
  JWT: {
    SECRET: getEnvVariable("JWT_SECRET", "secret_token"),
  },
});

export const config = appConfig();