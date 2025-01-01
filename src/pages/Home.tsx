import { Button } from "antd";
import { useAuth } from "../hooks/useAuth";

export const HomePage = () => {
  const { isAuthenticated, logout, user } = useAuth();

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Welcome to Entix</h1>
          {isAuthenticated && (
            <div className="space-y-2">
              <p className="text-right text-gray-600">
                Logged in as: {user?.username}
              </p>
              <Button
                type="primary"
                danger
                onClick={logout}
                className="ml-auto block"
              >
                Logout
              </Button>
            </div>
          )}
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          {isAuthenticated ? (
            <p className="text-lg">You're logged in! This is your dashboard.</p>
          ) : (
            <p className="text-lg">Please log in to access your dashboard.</p>
          )}
        </div>
      </div>
    </div>
  );
};
