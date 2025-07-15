import React, { useEffect, useState } from "react";
import type { List_with_image } from "../utils/types/lists";
import { Globe, GlobeLock } from "lucide-react";

const Lists: React.FC = () => {
  const [Lists, setLists] = useState<List_with_image[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [userid, setuserid] = useState<string>();
  const [copyPop, setCopyPop] = useState<boolean>(false);
  const [copyPopPontent, setCopyPopContent] = useState<string>("");

  const location = window.location.origin;
  const token = localStorage.getItem("authToken");

  useEffect(() => {
    const loadLists = async () => {
      try {
        const res = await fetch("/api/lists/get-all", {
          method: "get",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await res.json();
        setLists(data);
      } catch (err) {
        console.error("Failed to fetch:", err);
        setLists([
          {
            id: 345343,
            title: "Test Title",
            content: "string to describe the list",
            user_id: 23234234,
            is_private: false,
            url_safe_name: "testing",
            created_at: "now",
            latest_name: "last",
            latest_url: "string;",
          },
        ]);
      } finally {
        setLoading(false);
      }
    };
    const loadUserId = async () => {
      try {
        const res = await fetch("/api/user/validate", {
          method: "get",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await res.json();
        setuserid(data);
      } catch (err) {
        console.error("Failed to fetch:", err);
      } finally {
        setLoading(false);
      }
    };

    loadUserId();
    loadLists();
  }, []);

  return (
    <div className="min-h-screen bg-[#f0f6fb] p-4 flex flex-col items-center">
      <h1 className="text-3xl font-bold text-[#2C7DA0] mb-6">Lists</h1>

      <div className="grid gap-6 max-w-4xl w-full">
        {loading && (
          <p className="text-[#468FAF] text-center">Loading Lists...</p>
        )}

        {!loading && Lists.length === 0 && (
          <p className="text-[#468FAF] text-center">No Lists found.</p>
        )}

        {Lists.map((Lists) => (
          <div
            key={Lists.url_safe_name}
            className="block bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
          >
            {Lists.latest_url && (
              <img
                src={Lists.latest_url}
                alt={Lists.latest_name}
                className="w-full h-48 object-cover"
              />
            )}

            {Lists.is_private && <GlobeLock />}
            {!Lists.is_private && (
              <button
                onClick={() => {
                  setCopyPop(true);
                  setCopyPopContent(
                    `${location}/lists/${userid}/${Lists.url_safe_name}`
                  );
                }}
              >
                <Globe />
              </button>
            )}

            <div className="p-6">
              <h2 className="text-4xl font-semibold text-[#2C7DA0] mb-2">
                {Lists.title}
              </h2>
              <p className="text-gray-700 text-xl leading-relaxed">
                {Lists.content}
              </p>
            </div>
          </div>
        ))}
      </div>

      {copyPop && (
        <div className="fixed inset-0 z-50 flex justify-center items-center">
          <div
            className="absolute inset-0 bg-black opacity-50"
            onClick={() => setCopyPop(false)}
          ></div>

          <div className="bg-white rounded-xl p-6 w-full max-w-sm shadow-lg relative z-60">
            <button
              onClick={() => setCopyPop(false)}
              className="absolute top-2 right-3 text-gray-500 hover:text-black text-lg"
            >
              ×
            </button>

            <h2 className="text-xl font-bold text-[#2C7DA0] mb-4">Share URL</h2>

            <div className="flex items-center space-x-2 mb-2">
              <input
                type="text"
                readOnly
                value={copyPopPontent}
                onClick={(e) => e.currentTarget.select()}
                className="flex-1 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#2C7DA0] overflow-x-auto whitespace-nowrap"
              />
            </div>
            <button
              onClick={async () => {
                try {
                  await navigator.clipboard.writeText(copyPopPontent);
                } catch {
                  alert("Copy failed");
                }
              }}
              className="px-3 py-2 bg-[#2C7DA0] text-white rounded-lg hover:bg-[#468FAF] transition"
            >
              Copy
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Lists;
