import { Outlet, useLocation } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Breadcrumb from "../components/Breadcrumb";
import "../App.css";

const MainLayout = () => {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);

  const breadcrumbItems = [
    { label: "Home", href: "/" },
    ...pathnames.map((value, index) => {
      const href = "/" + pathnames.slice(0, index + 1).join("/");
      return {
        label: value.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()),
        href,
      };
    }),
  ];

  return (
    <div className="d-flex vh-100">
      <Sidebar activePath={location.pathname} />

      <div className="flex-grow-1 overflow-auto p-4">
        <div className="mb-3 shadow-sm p-2">
          <Breadcrumb items={breadcrumbItems} />
        </div>
        <Outlet />
      </div>
    </div>
  );
};

export default MainLayout;
