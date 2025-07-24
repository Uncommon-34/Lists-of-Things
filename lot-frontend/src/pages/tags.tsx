import React, { useEffect, useState } from "react";
import { formatTimestamp } from "../utils/time";
import type { Tag } from "../utils/types/database";

type tagsWithLatest = Tag & {
  latest_url: string;
  latest_name: string;
};

const Tags: React.FC = () => {
  const [Tags, setTags] = useState<tagsWithLatest[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const token = localStorage.getItem("authToken");

  useEffect(() => {
    const loadTags = async () => {
      try {
        const res = await fetch("/api/Tags/get-all", {
          method: "get",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await res.json();
        setTags(data);
      } catch (err) {
        console.error("Failed to fetch:", err);
        setTags([
          {
            id: 19823478,
            name: "name",
            url_safe_name: "name",
            colour_hex: "800080",
            user_id: 7893496946,
            created_at: "string;",
            latest_url: "faaefafefe",
            latest_name: "product one",
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
      } catch (err) {
        console.error("Failed to fetch:", err);
      } finally {
        setLoading(false);
      }
    };

    loadUserId();
    loadTags();
  }, []);

  return (
    <div className="min-h-screen bg-[#f0f6fb] p-4 flex flex-col items-center">
      <h1 className="text-3xl font-bold text-[#2C7DA0] mb-6">Tags</h1>

      <div className="grid gap-6 max-w-4xl w-full">
        {loading && (
          <p className="text-[#468FAF] text-center">Loading Tags...</p>
        )}

        {!loading && Tags.length === 0 && (
          <p className="text-[#468FAF] text-center">No Tags found.</p>
        )}

        {Tags.map((Tag) => (
          <a href={`/tags/${Tag.user_id}/${Tag.url_safe_name}`}>
            <div
              key={Tag.url_safe_name}
              className="block bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
            >
              {Tag.colour_hex && (
                <div
                  style={{ backgroundColor: `#${Tag.colour_hex}` }}
                  className={`p-6`}
                />
              )}

              {Tag.latest_url && (
                <img
                  src={Tag.latest_url}
                  alt={Tag.latest_name}
                  className="w-full h-48 p-5 object-cover"
                />
              )}

              <div className="pb-6 pl-6 pr-6">
                <h2 className="text-4xl font-semibold text-[#2C7DA0] mb-2">
                  {Tag.name}
                </h2>
                <p className="text-gray-700 text-sm leading-relaxed">
                  {formatTimestamp(Tag.created_at)}
                </p>
              </div>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
};

export default Tags;
