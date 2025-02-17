interface User {
  id: string;
  email: string;
  role: "admin" | "user";
}

class AuthService {
  private user: User | null = null;

  isAuthenticated(): boolean {
    // TODO: Implement actual authentication logic
    return true;
  }

  isAdmin(): boolean {
    // TODO: Implement actual role check
    return this.user?.role === "admin";
  }

  login(email: string, password: string): Promise<User> {
    // TODO: Implement actual login logic
    return Promise.resolve({
      id: "1",
      email,
      role: "user",
    });
  }

  logout(): Promise<void> {
    // TODO: Implement actual logout logic
    this.user = null;
    return Promise.resolve();
  }

  getCurrentUser(): User | null {
    return this.user;
  }
}

export const authService = new AuthService();
