import cn from "classnames";
import { Outlet } from "react-router-dom";
import { HTMLAttributes } from "react";
import { AppContainer } from "@/components/layout/AppContainer";

type AuthLayoutProps = HTMLAttributes<HTMLDivElement>;

export const AuthLayout: React.FC<AuthLayoutProps> = ({
  className,
  ...props
}) => {
  return (
    <AppContainer className={cn(className)} {...props}>
      <div className="h-full flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <Outlet />
      </div>
    </AppContainer>
  );
};
