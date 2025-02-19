import cn from "classnames";
import { Outlet } from "react-router-dom";
import { sidebarOpenAtom } from "@/features/admin/store/sidebar.store";
import { useAtom } from "jotai";
import { HTMLAttributes } from "react";
import { AppContainer } from "@/components/layout/AppContainer";
import { Sidebar } from "@/features/admin/components/sidebar/Sidebar";
import { MainContainer } from "@/components/layout/MainContainer";
import { FooterContainer } from "@/components/layout/FooterContainer";
import { SidebarContainer } from "@/components/layout/SidebarContainer";
import "./../styles/admin-layout.styles.css";

type AdminLayoutProps = HTMLAttributes<HTMLDivElement>;

export const AdminLayout: React.FC<AdminLayoutProps> = ({
  className,
  ...props
}) => {
  const [sidebarOpen, setSidebarOpen] = useAtom(sidebarOpenAtom);

  return (
    <AppContainer id="admin-app-container" className={cn(className)} {...props}>
      <SidebarContainer className="border-r">
        <Sidebar collapsed={!sidebarOpen} onCollapse={setSidebarOpen} />
      </SidebarContainer>

      <MainContainer className="border-r bg-gray-100">
        <Outlet />
      </MainContainer>

      <FooterContainer className="border-t bg-blue-100">
        <span>Footer</span>
      </FooterContainer>
    </AppContainer>
  );
};
