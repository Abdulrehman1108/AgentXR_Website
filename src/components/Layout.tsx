import { Outlet, useLocation } from "react-router-dom";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";

// Dashboard sub-routes that should NOT show the public navbar/footer
const DASHBOARD_PATHS = ["/dashboard", "/content", "/agents", "/settings"];

export const Layout = () => {
  const { pathname } = useLocation();

  const isDashboard = DASHBOARD_PATHS.some((p) => pathname === p || pathname.startsWith(p + "/"));
  const isAuth = ["/login", "/signup"].includes(pathname);

  const hideNav = isAuth || isDashboard;
  const hideFooter = isAuth || isDashboard;

  return (
    <div className="min-h-screen flex flex-col relative">
      {!hideNav && <Navbar />}
      <main className="flex-1">
        <Outlet />
      </main>
      {!hideFooter && <Footer />}
    </div>
  );
};
