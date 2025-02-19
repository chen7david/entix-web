import { z } from "zod";

const envSchema = z.object({
  VITE_API_URL: z.string().url(),
  VITE_COGNITO_REGION: z.string(),
  VITE_COGNITO_USER_POOL_ID: z.string(),
  VITE_COGNITO_CLIENT_ID: z.string(),
  //   ADD MORE ENV VARIABLES HERE ...
});

export type EnvConfig = z.infer<typeof envSchema>;

function validateEnv(): EnvConfig {
  try {
    const parsed = envSchema.safeParse(import.meta.env);

    if (!parsed.success) {
      const missingEnvs = parsed.error.errors.map((error) =>
        error.path.join(".")
      );
      throw new Error(
        `❌ Invalid environment variables:\n${missingEnvs
          .map((env) => `   - ${env} is missing or invalid`)
          .join("\n")}`
      );
    }

    return parsed.data;
  } catch (error) {
    if (error instanceof Error) {
      console.error("\n" + error.message + "\n");
    }
    return {} as EnvConfig;
  }
}

export const env = validateEnv();
