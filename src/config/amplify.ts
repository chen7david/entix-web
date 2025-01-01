import { Amplify } from "aws-amplify";
import { validateEnv } from "../util/validator";

export const configureAmplify = () => {
  validateEnv(["VITE_COGNITO_USER_POOL_ID", "VITE_COGNITO_CLIENT_ID"]);

  Amplify.configure({
    Auth: {
      Cognito: {
        userPoolId: import.meta.env.VITE_COGNITO_USER_POOL_ID,
        userPoolClientId: import.meta.env.VITE_COGNITO_CLIENT_ID,
        loginWith: {
          username: true,
          email: true,
        },
      },
    },
  });
};
