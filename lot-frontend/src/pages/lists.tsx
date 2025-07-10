import React, { useEffect, useState } from "react";
import type { List_with_image } from "../utils/types/lists";
import { Globe, GlobeLock } from "lucide-react";

const Lists: React.FC = () => {
  const [Lists, setLists] = useState<List_with_image[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadLists = async () => {
      try {
        const res = await fetch("/api/lists/get-all");
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
          <a
            key={Lists.url_safe_name}
            href={`/lists/${Lists.url_safe_name}`}
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
            {!Lists.is_private && <Globe />}

            <div className="p-6">
              <h2 className="text-4xl font-semibold text-[#2C7DA0] mb-2">
                {Lists.title}
              </h2>
              <p className="text-gray-700 text-xl leading-relaxed">
                {Lists.content}
              </p>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
};

export default Lists;
