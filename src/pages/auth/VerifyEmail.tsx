import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { App, Card, Typography, Space } from "antd";
import {
  VerifyEmailForm,
  VerifyEmailFormData,
} from "@/features/auth/components/VerifyEmailForm";

const { Title, Text } = Typography;

export const VerifyEmailPage: React.FC = () => {
  const { message } = App.useApp();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleVerifyEmail = async (values: VerifyEmailFormData) => {
    try {
      setLoading(true);
      console.log(values);
      await new Promise((resolve) => setTimeout(resolve, 1000));

      message.success("Email has been successfully verified!");
      navigate("/auth/login");
    } catch (error) {
      message.error("Failed to verify email. Please try again.");
      console.error("Email verification error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <Card className="w-full max-w-md">
        <div className="text-center mb-8">
          <Title level={2}>Verify Your Email</Title>
          <Text type="secondary">
            Enter the verification OTP sent to your email
          </Text>
        </div>

        <VerifyEmailForm onSubmit={handleVerifyEmail} loading={loading} />

        <div className="text-center mt-4">
          <Space direction="vertical" size="small">
            <Text>
              Didn't receive OTP?{" "}
              <Link to="/auth/request-verification">Request again</Link>
            </Text>
            <Text>
              Back to <Link to="/auth/login">Sign in</Link>
            </Text>
          </Space>
        </div>
      </Card>
    </div>
  );
};

export default VerifyEmailPage;
