import React, { useEffect, useState } from "react";
import { formatTimestamp } from "../utils/time";
import type { Item } from "../utils/types/database";

const Items: React.FC = () => {
  const [Items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const token = localStorage.getItem("authToken");

  useEffect(() => {
    const loadItems = async () => {
      try {
        const res = await fetch("/api/Items/get-all", {
          method: "get",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await res.json();
        setItems(data);
      } catch (err) {
        console.error("Failed to fetch:", err);
        setItems([
          {
            id: 5435343455,
            link: "A awsome link",
            name: "item name",
            url_safe_name: "same_item_name",
            image_url: "png_image",
            price: "£20",
            content: "kgfbbfgwiegf ighfiagff wfygwefg WFafge",
            user_id: 20,
            created_at: "5435343455",
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
    loadItems();
  }, []);

  return (
    <div className="min-h-screen bg-[#f0f6fb] p-4 flex flex-col items-center">
      <h1 className="text-3xl font-bold text-[#2C7DA0] mb-6">Items</h1>

      <div className="grid gap-6 max-w-4xl w-full">
        {loading && (
          <p className="text-[#468FAF] text-center">Loading Items...</p>
        )}

        {!loading && Items.length === 0 && (
          <p className="text-[#468FAF] text-center">No Items found.</p>
        )}

        {Items.map((Items) => (
          <a href={`/items/${Items.user_id}/${Items.url_safe_name}`}>
            <div
              key={Items.url_safe_name}
              className="block bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
            >
              {Items.image_url && (
                <img
                  src={Items.image_url}
                  alt={Items.name}
                  className="w-full h-48 p-5 object-cover"
                />
              )}

              <div className="pb-6 pl-6 pr-6">
                <h2 className="text-4xl font-semibold text-[#2C7DA0] mb-2">
                  {Items.name}
                </h2>
                <p className="text-gray-950 text-[1.3vh] leading-relaxed">
                  {Items.price}
                </p>
                <p className="text-gray-700 text-xl leading-relaxed">
                  {Items.content}
                </p>
                <p className="text-gray-700 text-sm leading-relaxed">
                  {formatTimestamp(Items.created_at)}
                </p>
              </div>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
};

export default Items;
