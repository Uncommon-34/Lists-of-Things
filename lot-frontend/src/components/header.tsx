import React from "react";
import { Boxes, ListCollapse, Tag } from "lucide-react";
import { useLocation, Link } from "react-router-dom";

const Header: React.FC = () => {
  const location = useLocation();
  const current = location.pathname;
  console.log(current);

  const isActive = (paths: string[]) =>
    paths.some((path) => current.startsWith(path))
      ? "text-black"
      : "text-gray-400";

  return (
    <>
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-md flex justify-around py-3 z-50">
        <Link
          to="/lists"
          className={`flex flex-row items-center gap-2 ${isActive(["/lists"])}`}
        >
          <ListCollapse className="w-9 h-9" />
          <span className="text-base">Lists</span>
        </Link>
        <Link
          to="/items"
          className={`flex flex-row items-center gap-2 ${isActive(["/items"])}`}
        >
          <Boxes className="w-9 h-9" />
          <span className="text-base">Items</span>
        </Link>
        <Link
          to="/tags"
          className={`flex flex-row items-center gap-2 ${isActive(["/tags"])}`}
        >
          <Tag className="w-9 h-9" />
          <span className="text-base">Tags</span>
        </Link>
      </nav>
    </>
  );
};

export default Header;
