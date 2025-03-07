import { Button } from "antd";
import { useAuth } from "@/features/auth/hooks/auth.hook";
import { useNavigate } from "react-router-dom";
import { AuthRoutes } from "@/constants/routes.constant";

type LogoutButtonProps = {
  className?: string;
};

export const LogoutButton: React.FC<LogoutButtonProps> = ({ className }) => {
  const { logout, isLoading } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    const result = await logout();
    if (result.success) {
      navigate(AuthRoutes.LOGIN);
    }
  };

  return (
    <Button
      onClick={handleLogout}
      loading={isLoading}
      className={className}
      type="link"
      danger
    >
      Logout
    </Button>
  );
};

export default LogoutButton;
