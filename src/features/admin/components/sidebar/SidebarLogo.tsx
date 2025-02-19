import { Typography } from 'antd';
import { Link } from 'react-router-dom';

const { Title } = Typography;

interface SidebarLogoProps {
  collapsed: boolean;
}

export const SidebarLogo: React.FC<SidebarLogoProps> = ({ collapsed }) => {
  return (
    <div className="h-16 m-4 mb-8 flex items-center justify-center">
      <Link to="/admin/dashboard" className="flex items-center">
        {collapsed ? (
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
            <span className="text-white text-lg font-bold">E</span>
          </div>
        ) : (
          <Title level={4} className="m-0 text-white">
            Entix Admin
          </Title>
        )}
      </Link>
    </div>
  );
};
