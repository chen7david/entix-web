export enum AuthRoutes {
  LOGIN = '/auth/login',
  REGISTER = '/auth/register',
  FORGOT_PASSWORD = '/auth/forgot-password',
  RESET_PASSWORD = '/auth/reset-password',
  VERIFY_EMAIL = '/auth/verify-email',
  REQUEST_VERIFICATION = '/auth/request-verification',
}

export enum AdminRoutes {
  USERS = '/admin/users',
  PROFILE = '/admin/profile',
  SETTINGS = '/admin/settings',
  DASHBOARD = '/admin/dashboard',
  REPORTS = '/admin/reports',
}

export const ROOT_REDIRECT = AuthRoutes.LOGIN;

// Helper function to add query parameters to routes
export const addQueryParams = (route: string, params: Record<string, string>) => {
  const searchParams = new URLSearchParams(params);
  return `${route}?${searchParams.toString()}`;
};

// Helper function to create redirect URL for auth routes
export const createAuthRedirectUrl = (redirectPath: string) => {
  return addQueryParams(AuthRoutes.LOGIN, { redirect: redirectPath });
};