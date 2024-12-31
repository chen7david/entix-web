import { Outlet } from "react-router-dom";

export const RootLayout = () => {
  return (
    <div>
      {/* add menu here ... */}
      Menu is here...
      <Outlet />
    </div>
  );
};
