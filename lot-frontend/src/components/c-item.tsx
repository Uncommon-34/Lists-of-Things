import { useEffect, useState } from "react";
import type { Item, Tag } from "../utils/types/database";

type ItemWithTags = Item & {
  tags: string[];
};

export const Citem: React.FC = () => {
  const [url, setUrl] = useState("");
  const [name, setName] = useState("");
  const [urlName, setUrlName] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [price, setPrice] = useState("");
  const [notes, setNotes] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [availableTags, setAvailableTags] = useState<Tag[]>([]);
  const [hasUrl, setHasUrl] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const token = localStorage.getItem("authToken");

  // Fetch available tags from backend
  useEffect(() => {
    const fetchTags = async () => {
      try {
        const res = await fetch("/api/tags/get-all-user", {
          method: "get",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!res.ok) throw new Error("Failed to fetch tags");
        const data = await res.json();
        setAvailableTags(data.tags);
      } catch (err: any) {
        console.error(err);
      }
    };
    fetchTags();
  }, []);

  const toggleTag = (tagId: string) => {
    setTags((prev) =>
      prev.includes(tagId) ? prev.filter((t) => t !== tagId) : [...prev, tagId]
    );
  };

  const handleCreateProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const body = JSON.stringify({});

      const response = await fetch("/api/user/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: body,
      });

      const data = await response.json();

      if (data.success && data.token) {
        localStorage.setItem("authToken", data.token);
      } else {
        setError("failed to create account.");
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
    }
  };

  const handleUrl = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const body = JSON.stringify({});

      const response = await fetch("/api/user/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: body,
      });

      const data = await response.json();

      if (data.success) {
        localStorage.setItem("authToken", data.token);
      } else {
        setError("failed to create account.");
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f0f6fb] p-2">
      <div className="w-full max-w-xl bg-white rounded-2xl shadow-lg p-6 space-y-6">
        <h1 className="text-2xl font-bold text-center text-[#2C7DA0]">
          Create Item
        </h1>

        <div className="border-t border-gray-300 my-6" />

        <form onSubmit={handleUrl} className="space-y-6">
          <div>
            <label
              className={`block text-sm font-medium text-[#468FAF] transition-all duration-200 ${
                hasUrl ? "opacity-50" : ""
              }`}
            >
              Product URL
            </label>
            <div className="mt-4 w-full">
              <div className="flex flex-col sm:flex-row items-stretch gap-3">
                <input
                  type="url"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  className={`flex-1 px-4 py-2 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-[#61A5C2] transition-all duration-200 ${
                    hasUrl ? "opacity-50" : ""
                  }`}
                  disabled={hasUrl}
                  placeholder="https://example.com/product"
                />
                {hasUrl && (
                  <button
                    onClick={() => setHasUrl(false)}
                    className="px-6 py-2 bg-[#2C7DA0] text-white rounded-xl hover:bg-[#468FAF] transition-colors whitespace-nowrap"
                  >
                    Edit
                  </button>
                )}
                {!hasUrl && (
                  <button
                    type="submit"
                    className="px-6 py-2 bg-[#2C7DA0] text-white rounded-xl hover:bg-[#468FAF] transition-colors whitespace-nowrap"
                  >
                    Get URL
                  </button>
                )}
              </div>
            </div>
          </div>
        </form>

        <div className="border-t border-gray-300 my-6" />

        <form onSubmit={handleCreateProduct} className="space-y-6">
          <div
            className={`transition-all duration-200 ${
              hasUrl ? "" : "opacity-50 pointer-events-none"
            }`}
          >
            <div>
              <label className="block text-sm font-medium text-[#468FAF]">
                Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="mt-1 block w-full px-4 py-2 border rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-[#61A5C2]"
                placeholder="Product Name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-[#468FAF]">
                URL Safe Name
              </label>
              <input
                type="text"
                value={urlName}
                onChange={(e) => setUrlName(e.target.value)}
                className="mt-1 block w-full px-4 py-2 border rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-[#61A5C2]"
                placeholder="product-name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-[#468FAF]">
                Image URL
              </label>
              <input
                type="url"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                className="mt-1 block w-full px-4 py-2 border rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-[#61A5C2]"
                placeholder="https://example.com/image.png"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-[#468FAF]">
                Price
              </label>
              <input
                type="text"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="mt-1 block w-full px-4 py-2 border rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-[#61A5C2]"
                placeholder="$0.00"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-[#468FAF]">
                Notes
              </label>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={4}
                className="mt-1 block w-full px-4 py-2 border rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-[#61A5C2]"
                placeholder="Additional notes..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-[#468FAF] mb-2">
                Tags
              </label>
              <div className="flex flex-wrap gap-2">
                {availableTags.map((tag) => {
                  const isSelected = tags.includes(tag.id.toString());
                  return (
                    <button
                      key={tag.id}
                      type="button"
                      onClick={() => toggleTag(tag.id.toString())}
                      className={`px-3 py-1 rounded-full text-sm font-medium border transition ${
                        isSelected
                          ? "ring-2 ring-offset-2 ring-[#2C7DA0] scale-105"
                          : "opacity-80 hover:opacity-100"
                      }`}
                      style={{
                        backgroundColor: tag.colour_hex ?? "#CBD5E1",
                        color: "#fff",
                      }}
                    >
                      {tag.name}
                    </button>
                  );
                })}
              </div>
            </div>
            <button
              type="submit"
              className="w-full bg-[#2C7DA0] text-white py-2 rounded-xl hover:bg-[#468FAF] transition-colors"
            >
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Citem;
