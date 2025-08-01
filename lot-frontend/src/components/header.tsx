import React from "react";
import { Boxes, CirclePlus, ListCollapse, Tag, User } from "lucide-react";
import { useLocation, Link } from "react-router-dom";

const Header: React.FC = () => {
  const location = useLocation();
  const current = location.pathname;
  console.log(current);

  const isActive = (paths: string[]) =>
    paths.some((path) => current.startsWith(path))
      ? "text-black"
      : "text-gray-400";

  const isActiveCreate = (paths: string[]) =>
    paths.some((path) => current.startsWith(path))
      ? "text-black"
      : "text-gray-100";

  return (
    <>
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-md flex justify-around py-[4px] z-50">
        <Link
          to="/user"
          className={`flex flex-row items-center gap-2 hover:-translate-y-2 transition-transform ${isActive(
            ["/user"]
          )}`}
        >
          <User className="w-6 h-6" />
          <span className="text-base">User</span>
        </Link>
        <Link
          to="/lists"
          className={`flex flex-row items-center gap-2 hover:-translate-y-2 transition-transform ${isActive(
            ["/lists"]
          )}`}
        >
          <ListCollapse className="w-6 h-6" />
          <span className="text-base">Lists</span>
        </Link>
        <Link
          to="/create"
          className={`flex flex-row items-center text-center p-2 bg-blue-600 hover:bg-blue-400 hover:-translate-y-2 transition-transform rounded-2xl ${isActiveCreate(
            ["/create"]
          )}`}
        >
          <CirclePlus className="w-10 h-10" />
        </Link>
        <Link
          to="/items"
          className={`flex flex-row items-center gap-2 hover:-translate-y-2 transition-transform ${isActive(
            ["/items"]
          )}`}
        >
          <Boxes className="w-6 h-6" />
          <span className="text-base">Items</span>
        </Link>
        <Link
          to="/tags"
          className={`flex flex-row items-center gap-2 hover:-translate-y-2 transition-transform ${isActive(
            ["/tags"]
          )}`}
        >
          <Tag className="w-6 h-6" />
          <span className="text-base">Tags</span>
        </Link>
      </nav>
    </>
  );
};

export default Header;
