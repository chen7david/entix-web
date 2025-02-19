import cn from "classnames";
import { useAtom } from "jotai";
import { HTMLAttributes } from "react";
import { Outlet } from "react-router-dom";
import { AdminAppContainer } from "./components/AdminAppContainer";
import { AdminSidebarContainer } from "./components/AdminSidebarContainer";
import { AdminMainContainer } from "./components/AdminMainContainer";
import { AdminFooterContainer } from "./components/AdminFooterContainer";
import { AdminNavbarContainer } from "./components/AdminNavbarContainer";
import { sidebarOpenAtom } from "./store/sidebar.store";
import "./styles/admin-layout.styles.css";

type AdminLayoutProps = HTMLAttributes<HTMLDivElement>;

export const AdminLayout: React.FC<AdminLayoutProps> = ({
  className,
  ...props
}) => {
  const [sidebarOpen, setSidebarOpen] = useAtom(sidebarOpenAtom);

  return (
    <AdminAppContainer className={cn(className)} {...props}>
      <AdminSidebarContainer className="bg-gray-200">
        sidebar
      </AdminSidebarContainer>
      <AdminNavbarContainer className="bg-blue-200">
        navbar
      </AdminNavbarContainer>

      <AdminMainContainer className="bg-gray-100">
        <Outlet />
      </AdminMainContainer>

      <AdminFooterContainer className="bg-blue-100">
        <span>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nesciunt,
          quo voluptatum. Rem eius pariatur cumque, in consectetur iste officia
          deserunt alias perspiciatis deleniti molestiae suscipit labore,
          delectus assumenda magnam impedit itaque tempora possimus nemo ut!
          Soluta enim error eligendi labore vel velit aperiam consequuntur
          minima, maiores, pariatur neque? Beatae labore harum esse veniam, illo
          delectus, eligendi quidem sapiente exercitationem enim nesciunt
          aperiam laboriosam voluptatum alias voluptas consequuntur quos
          quibusdam ab animi aliquam autem non. Facere soluta saepe iure
          accusamus alias minus perferendis? Culpa voluptate beatae praesentium
          obcaecati nostrum in ut porro, delectus, blanditiis laborum facilis
          minus inventore eligendi ea animi.
        </span>
      </AdminFooterContainer>
    </AdminAppContainer>
  );
};
