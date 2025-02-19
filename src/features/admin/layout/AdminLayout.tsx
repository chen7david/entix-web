import cn from "classnames";
import { Outlet } from "react-router-dom";
import { sidebarOpenAtom } from "@/features/admin/store/sidebar.store";
import { useAtom } from "jotai";
import { HTMLAttributes } from "react";
import { AppContainer } from "@/components/layout/AppContainer";

type AdminLayoutProps = HTMLAttributes<HTMLDivElement>;

export const AdminLayout: React.FC<AdminLayoutProps> = ({
  className,
  ...props
}) => {
  const [sidebarOpen] = useAtom(sidebarOpenAtom);

  return (
    <AppContainer className={className} {...props}>
      <Outlet />
    </AppContainer>
  );
};
