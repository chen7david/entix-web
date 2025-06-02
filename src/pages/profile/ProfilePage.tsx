import { Typography, Spin, Button } from "antd";
import { useQuery } from "@tanstack/react-query";
import { authService } from "../../services/api";
import { useNavigate } from "react-router-dom";

const { Title, Text } = Typography;

export const ProfilePage = () => {
  const navigate = useNavigate();

  const { data, isLoading } = useQuery({
    queryKey: ["me"],
    queryFn: () => authService.getMe(),
  });

  const handleLogout = () => {
    authService.clearAuthContext();
    navigate("/auth/signin");
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-full mt-10">
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto mt-10 text-center">
      <Title level={2}>Profile</Title>
      <Text type="secondary">Welcome back,</Text>
      <Title level={4} className="mt-2">
        {data?.username}
      </Title>

      <Button type="primary" danger className="mt-6" onClick={handleLogout}>
        Logout
      </Button>
    </div>
  );
};
