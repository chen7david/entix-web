import { useState } from "react";
import { Card, Typography, message } from "antd";
import {
  SettingsForm,
  SettingsFormData,
} from "@/features/user/components/SettingsForm";

const { Title } = Typography;

export const SettingsPage: React.FC = () => {
  const [loading, setLoading] = useState(false);

  // Mock initial data - replace with actual user settings from your backend
  const initialData: SettingsFormData = {
    emailNotifications: true,
    pushNotifications: false,
    language: "en",
    theme: "light",
    twoFactorAuth: false,
  };

  const handleSettingsUpdate = async (values: SettingsFormData) => {
    try {
      setLoading(true);
      // TODO: Implement actual API call
      console.log(values);
      await new Promise((resolve) => setTimeout(resolve, 1000));
      message.success("Settings updated successfully!");

      // Apply theme change if it was updated
      if (values.theme !== initialData.theme) {
        // TODO: Implement theme change logic
        console.log("Theme changed to:", values.theme);
      }
    } catch (error) {
      message.error("Failed to update settings. Please try again.");
      console.error("Settings update error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <Title level={2}>Settings</Title>
      <div className="mt-6">
        <Card>
          <SettingsForm
            initialData={initialData}
            onSubmit={handleSettingsUpdate}
            loading={loading}
          />
        </Card>
      </div>
    </div>
  );
};

export default SettingsPage;
