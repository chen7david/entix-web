import { useState } from "react";
import { Card, Typography, message, Tabs } from "antd";
import {
  ProfileForm,
  ProfileFormData,
} from "@/features/user/components/ProfileForm";
import { UserOutlined, HistoryOutlined } from "@ant-design/icons";

const { Title } = Typography;
const { TabPane } = Tabs;

export const ProfilePage: React.FC = () => {
  const [loading, setLoading] = useState(false);

  // Mock initial data - replace with actual user data from your backend
  const initialData: ProfileFormData = {
    username: "johndoe",
    email: "john.doe@example.com",
    fullName: "John Doe",
    phone: "+1 (555) 123-4567",
    bio: "Software developer passionate about creating great user experiences.",
    avatar: "https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50",
  };

  const handleProfileUpdate = async (values: ProfileFormData) => {
    try {
      setLoading(true);
      // TODO: Implement actual API call
      console.log(values);
      await new Promise((resolve) => setTimeout(resolve, 1000));
      message.success("Profile updated successfully!");
    } catch (error) {
      message.error("Failed to update profile. Please try again.");
      console.error("Profile update error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <Title level={2}>Profile</Title>
      <div className="mt-6">
        <Card>
          <Tabs defaultActiveKey="profile">
            <TabPane
              tab={
                <span className="flex items-center gap-2">
                  <UserOutlined />
                  Profile Information
                </span>
              }
              key="profile"
            >
              <ProfileForm
                initialData={initialData}
                onSubmit={handleProfileUpdate}
                loading={loading}
              />
            </TabPane>
            <TabPane
              tab={
                <span className="flex items-center gap-2">
                  <HistoryOutlined />
                  Activity History
                </span>
              }
              key="activity"
            >
              <div className="py-4">
                <Title level={5}>Recent Activity</Title>
                <p className="text-gray-500">
                  Your recent activity will appear here.
                </p>
                {/* TODO: Add activity history component */}
              </div>
            </TabPane>
          </Tabs>
        </Card>
      </div>
    </div>
  );
};

export default ProfilePage;
