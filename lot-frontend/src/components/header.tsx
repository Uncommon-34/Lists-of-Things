import React from "react";
import { ListCollapse } from "lucide-react";
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
          to="/Lists"
          className={`flex flex-row items-center gap-2 ${isActive(["/lists"])}`}
        >
          <ListCollapse className="w-13 h-13" />
          <span className="text-base">Lists</span>
        </Link>
      </nav>
    </>
  );
};

export default Header;
