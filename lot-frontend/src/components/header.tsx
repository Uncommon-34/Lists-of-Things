import React from "react";
import { Home, Flag, BookText, LayoutDashboard } from "lucide-react";
import { useLocation, Link } from "react-router-dom";

const Header: React.FC = () => {
  const location = useLocation();
  const current = location.pathname;

  const isActive = (paths: string[]) =>
    paths.includes(current) ? "text-black" : "text-gray-400";

  return (
    <>
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-md flex justify-around py-3 z-50">
        <Link
          to="/"
          className={`flex flex-col items-center ${isActive(["/"])}`}
        >
          <Home className="w-9 h-9" />
          <span className="text-base">Home</span>
        </Link>
        <Link
          to="/report"
          className={`flex flex-col items-center ${isActive(["/report"])}`}
        >
          <Flag className="w-9 h-9" />
          <span className="text-xs">Report</span>
        </Link>
        <Link
          to="/portal"
          className={`flex flex-col items-center ${isActive([
            "/portal",
            "/portal/admin",
            "/portal/worker",
            "/login",
          ])}`}
        >
          <LayoutDashboard className="w-9 h-9" />
          <span className="text-xs">Portal</span>
        </Link>
        <Link
          to="/articles"
          className={`flex flex-col items-center ${isActive(["/articles"])}`}
        >
          <BookText className="w-9 h-9" />
          <span className="text-xs">Articles</span>
        </Link>
      </nav>
    </>
  );
};

export default Header;
