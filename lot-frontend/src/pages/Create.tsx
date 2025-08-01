import React, { useState } from "react";
import Clist from "../components/c-list";
import Citem from "../components/c-item";
import Ctag from "../components/c-tag";

const Create: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"tag" | "item" | "list">("item");
  // const token = localStorage.getItem("authToken");
  // const navigate = useNavigate();

  // const fetchProfile = useCallback(async () => {
  //   try {
  //     const res = await fetch("/api/user/admin/me", {
  //       headers: { Authorization: `Bearer ${token}` },
  //     });
  //     if (!res.ok) {
  //       navigate("/");
  //       throw new Error("Failed to fetch articles");
  //     }
  //   } catch (err) {
  //     console.error(err);
  //   }
  // }, []);

  // useEffect(() => {
  //   fetchProfile();
  // }, [fetchProfile]);

  const navitems = [
    { id: "list", label: "List" },
    { id: "item", label: "Item" },
    { id: "tag", label: "Tag" },
  ];

  return (
    <div className="min-h-screen bg-[#f0f6fb] p-4 sm:p-6 flex flex-col items-center relative">
      <div className="w-full max-w-6xl flex justify-center items-center mb-6">
        <h1 className="text-3xl sm:text-4xl font-bold text-[#2C7DA0]">
          Create
        </h1>
      </div>

      <nav className="fixed bottom-15 left-0 right-0 flex flex-wrap justify-center gap-10 mb-6">
        {navitems.map(({ id, label }) => (
          <button
            key={id}
            className={`px-10 py-5 rounded-lg font-semibold transition ${
              activeTab === id
                ? "bg-[#2C7DA0] text-white shadow-lg"
                : "bg-[#A9D6E5] hover:bg-[#92bccc]"
            }`}
            onClick={() => setActiveTab(id as any)}
          >
            {label}
          </button>
        ))}
      </nav>

      <div className="w-full max-w-5xlS">
        {activeTab === "list" && <Clist />}
        {activeTab === "item" && <Citem />}
        {activeTab === "tag" && <Ctag />}
      </div>
    </div>
  );
};

export default Create;
