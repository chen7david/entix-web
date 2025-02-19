import { Amplify } from "aws-amplify";
import { env } from "./env.config";

Amplify.configure({
  Auth: {
    Cognito: {
      userPoolId: env.VITE_COGNITO_USER_POOL_ID,
      userPoolClientId: env.VITE_COGNITO_CLIENT_ID,
      loginWith: {
        username: true,
        email: true,
      },
    },
  },
});
