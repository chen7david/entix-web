import React from 'react';
import { Button, DatePicker, Space } from 'antd';

/**
 * Main application component.
 * @returns {JSX.Element} The rendered App component.
 */
const App: React.FC = () => (
  <div style={{ padding: '50px' }}>
    <Space direction="vertical" size={16}>
      <h1 className="text-2xl font-bold mb-4">Ant Design Components Demo</h1>
      <Space wrap>
        <Button type="primary">Primary Button</Button>
        <Button>Default Button</Button>
        <Button type="dashed">Dashed Button</Button>
        <Button type="text">Text Button</Button>
        <Button type="link">Link Button</Button>
      </Space>
      <Space>
        <DatePicker />
        <DatePicker picker="week" />
        <DatePicker picker="month" />
        <DatePicker picker="year" />
      </Space>
      <p className="text-blue-500">This is a Tailwind styled paragraph.</p>
    </Space>
  </div>
);

export default App;
