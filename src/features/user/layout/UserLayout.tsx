import cn from "classnames";
import { Outlet } from "react-router-dom";
import { HTMLAttributes } from "react";
import { AppContainer } from "@/components/layout/AppContainer";

type UserLayoutProps = HTMLAttributes<HTMLDivElement>;

export const UserLayout: React.FC<UserLayoutProps> = ({
  className,
  ...props
}) => {
  return (
    <AppContainer className={cn(className)} {...props}>
      <Outlet />
    </AppContainer>
  );
};
