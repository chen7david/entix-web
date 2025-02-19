import { z } from "zod";

const envSchema = z.object({
  VITE_API_URL: z.string().url(),
  VITE_COGNITO_REGION: z.string(),
  VITE_COGNITO_USER_POOL_ID: z.string(),
  VITE_COGNITO_CLIENT_ID: z.string(),
  //   ADD MORE ENV VARIABLES HERE ...
});

export type EnvConfig = z.infer<typeof envSchema>;

export const validateEnv = (values: Record<string, string>): EnvConfig => {
  const parsed = envSchema.safeParse(values);

  if (!parsed.success) {
    const missingEnvs = parsed.error.errors.map((error) =>
      error.path.join(".")
    );

    console.error(
      `❌ Invalid environment variables:\n${missingEnvs
        .map((env) => `   - ${env} is missing or invalid`)
        .join("\n")}`
    );
    return {} as EnvConfig;
  }

  return parsed.data;
};

export const env = validateEnv(import.meta.env);
