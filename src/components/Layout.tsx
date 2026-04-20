import { Outlet, useLocation } from "react-router-dom";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";

export const Layout = () => {
  const { pathname } = useLocation();
  const hideNav = ["/login", "/signup"].includes(pathname);
  const hideFooter = ["/login", "/signup", "/dashboard"].includes(pathname);

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
