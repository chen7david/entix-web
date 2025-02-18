import { Form, Input, Button, Upload, message } from "antd";
import {
  UserOutlined,
  MailOutlined,
  PhoneOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import { RcFile } from "antd/es/upload";

export interface ProfileFormData {
  username: string;
  email: string;
  fullName: string;
  phone?: string;
  bio?: string;
  avatar?: string;
}

interface ProfileFormProps {
  initialData: ProfileFormData;
  onSubmit: (values: ProfileFormData) => Promise<void>;
  loading?: boolean;
}

export const ProfileForm: React.FC<ProfileFormProps> = ({
  initialData,
  onSubmit,
  loading = false,
}) => {
  const [form] = Form.useForm();

  const beforeUpload = (file: RcFile) => {
    const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
    if (!isJpgOrPng) {
      message.error("You can only upload JPG/PNG files!");
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error("Image must be smaller than 2MB!");
    }
    return isJpgOrPng && isLt2M;
  };

  return (
    <Form
      form={form}
      layout="vertical"
      initialValues={initialData}
      onFinish={onSubmit}
    >
      <Form.Item>
        <Upload
          name="avatar"
          listType="picture-card"
          className="avatar-uploader"
          showUploadList={false}
          beforeUpload={beforeUpload}
          maxCount={1}
        >
          {initialData.avatar ? (
            <img
              src={initialData.avatar}
              alt="avatar"
              style={{ width: "100%" }}
            />
          ) : (
            <div>
              <UploadOutlined />
              <div style={{ marginTop: 8 }}>Upload Photo</div>
            </div>
          )}
        </Upload>
      </Form.Item>

      <Form.Item
        name="username"
        label="Username"
        rules={[
          { required: true, message: "Please input your username!" },
          { min: 3, message: "Username must be at least 3 characters!" },
        ]}
      >
        <Input prefix={<UserOutlined />} placeholder="Username" />
      </Form.Item>

      <Form.Item
        name="email"
        label="Email"
        rules={[
          { required: true, message: "Please input your email!" },
          { type: "email", message: "Please enter a valid email!" },
        ]}
      >
        <Input prefix={<MailOutlined />} placeholder="Email" disabled />
      </Form.Item>

      <Form.Item
        name="fullName"
        label="Full Name"
        rules={[{ required: true, message: "Please input your full name!" }]}
      >
        <Input prefix={<UserOutlined />} placeholder="Full Name" />
      </Form.Item>

      <Form.Item
        name="phone"
        label="Phone Number"
        rules={[
          { pattern: /^\+?[\d\s-]+$/, message: "Please enter a valid phone number!" },
        ]}
      >
        <Input prefix={<PhoneOutlined />} placeholder="Phone Number" />
      </Form.Item>

      <Form.Item name="bio" label="Bio">
        <Input.TextArea
          placeholder="Tell us about yourself"
          autoSize={{ minRows: 3, maxRows: 6 }}
        />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" loading={loading} block>
          Save Changes
        </Button>
      </Form.Item>
    </Form>
  );
};

export default ProfileForm;
