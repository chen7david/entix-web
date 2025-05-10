import React from 'react';
import { Table, Tag, Space, Button, Input } from 'antd';
import type { TableProps } from 'antd'; // Type-only import
import { UserAddOutlined, EditOutlined, DeleteOutlined, SearchOutlined } from '@ant-design/icons';
import PageHeaderComponent from '../../components/ui/PageHeader'; // Import PageHeaderComponent

/**
 * Type for user data in the table.
 */
type UserDataType = {
  key: string;
  name: string;
  email: string;
  role: 'Admin' | 'Editor' | 'Viewer'; // More specific roles
  status: 'active' | 'inactive';
  lastLogin: string;
};

// Sample data - replace with actual data fetching
const dataSource: UserDataType[] = [
  {
    key: '1',
    name: 'John Brown',
    email: 'john.brown@example.com',
    role: 'Admin',
    status: 'active',
    lastLogin: '2024-07-28 10:30 AM',
  },
  {
    key: '2',
    name: 'Jim Green',
    email: 'jim.green@example.com',
    role: 'Editor',
    status: 'inactive',
    lastLogin: '2024-07-25 02:15 PM',
  },
  {
    key: '3',
    name: 'Joe Black',
    email: 'joe.black@example.com',
    role: 'Viewer',
    status: 'active',
    lastLogin: '2024-07-29 09:00 AM',
  },
];

const columns: TableProps<UserDataType>['columns'] = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    sorter: (a: UserDataType, b: UserDataType) => a.name.localeCompare(b.name),
  },
  { title: 'Email', dataIndex: 'email', key: 'email' },
  {
    title: 'Role',
    dataIndex: 'role',
    key: 'role',
    filters: [
      { text: 'Admin', value: 'Admin' },
      { text: 'Editor', value: 'Editor' },
      { text: 'Viewer', value: 'Viewer' },
    ],
    onFilter: (value, record) => record.role === (value as string),
  },
  {
    title: 'Status',
    dataIndex: 'status',
    key: 'status',
    render: (status: UserDataType['status']) => (
      <Tag color={status === 'active' ? 'green' : 'volcano'}>{status.toUpperCase()}</Tag>
    ),
    filters: [
      { text: 'Active', value: 'active' },
      { text: 'Inactive', value: 'inactive' },
    ],
    onFilter: (value, record) => record.status === (value as string),
  },
  { title: 'Last Login', dataIndex: 'lastLogin', key: 'lastLogin' },
  {
    title: 'Action',
    key: 'action',
    render: (_: unknown, record: UserDataType) => (
      <Space size="middle">
        <Button
          type="link"
          icon={<EditOutlined />}
          onClick={() => console.log('Edit user:', record.key)}
        >
          Edit
        </Button>
        <Button
          type="link"
          danger
          icon={<DeleteOutlined />}
          onClick={() => console.log('Delete user:', record.key)}
        >
          Delete
        </Button>
      </Space>
    ),
  },
];

/**
 * Admin Users Page.
 * Displays a table of users with actions.
 * @returns {JSX.Element} The rendered AdminUsersPage component.
 */
const AdminUsersPage: React.FC = () => {
  return (
    <div>
      <PageHeaderComponent
        title="User Management"
        description="Manage all registered users in the system. You can add, edit, or delete user accounts."
        marginBottom="24px" // Keep the slightly larger margin for this page structure
      />
      <Space style={{ marginBottom: 16, width: '100%', justifyContent: 'space-between' }}>
        <Input
          placeholder="Search users..."
          prefix={<SearchOutlined />}
          style={{ width: 300 }}
          // onChange={(e) => console.log(e.target.value)} // Add search logic here
        />
        <Button type="primary" icon={<UserAddOutlined />}>
          Add User
        </Button>
      </Space>
      <Table
        dataSource={dataSource}
        columns={columns}
        rowKey="key"
        bordered
        scroll={{ x: 'max-content' }} // Enable horizontal scrolling
      />
    </div>
  );
};

export default AdminUsersPage;
