import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import type { Item, List, User } from "../utils/types/database";
import { Globe, GlobeLock, User as Usericon, UserLock } from "lucide-react";
import { formatTimestamp } from "../utils/time";

type ListWithItems = List & {
  owner: User;
  other_accsess: boolean;
  items: Item[];
};

const List: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const { userid, slug } = useParams();
  const [list, setList] = useState<ListWithItems>({
    id: 345343,
    title: "Test Title",
    url_safe_name: "testing",
    content: "string to describe the list",
    user_id: 23234234,
    is_private: false,
    created_at: "now",
    owner: {
      id: 65366,
      email: "bjvikbvsv",
      created_at: "string",
    },
    other_accsess: true,
    items: [
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
    ],
  });
  const [copyPop, setCopyPop] = useState<boolean>(false);
  const [copyPopPontent, setCopyPopContent] = useState<string>("");

  const location = window.location.origin;
  const token = localStorage.getItem("authToken");

  useEffect(() => {
    const loadLists = async () => {
      try {
        const body = JSON.stringify({ userid, slug });
        const res = await fetch("/api/lists/get-one", {
          method: "get",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: body,
        });
        const data = await res.json();
        if (data) setList(data);
      } catch (err) {
        console.error("Failed to fetch:", err);
      } finally {
        setLoading(false);
      }
    };

    loadLists();
  }, []);

  return (
    <div className="min-h-screen bg-[#f0f6fb] p-6 flex flex-col items-center space-y-10">
      <section className="w-full">
        <div
          key={list.url_safe_name}
          className="block bg-white rounded-2xl shadow-lg overflow-hidden transition-shadow duration-300"
        >
          <div className="inline-flex items-center gap-5 pt-5 pl-5">
            <h2 className="text-4xl font-semibold text-[#2C7DA0] mb-2">
              {list.title}
            </h2>
            {list.is_private && (
              <div className="flex items-center">
                <GlobeLock />
              </div>
            )}
            {!list.is_private && (
              <button
                onClick={() => {
                  setCopyPop(true);
                  setCopyPopContent(
                    `${location}/lists/${list.owner.id}/${list.url_safe_name}`
                  );
                }}
                className="flex items-center"
              >
                <Globe />
              </button>
            )}
            {list.other_accsess && (
              <div className="flex items-center">
                <Usericon />
              </div>
            )}
            {!list.other_accsess && (
              <div className="flex items-center">
                <UserLock />
              </div>
            )}
          </div>
          <div className="pb-6 pl-6 pr-6">
            <p className="text-gray-700">Owner: {list.owner.email}</p>
            <p className="pt-3 pb-3 text-gray-700 text-xl leading-relaxed">
              {list.content}
            </p>
            <p className="text-gray-700 text-sm leading-relaxed">
              {formatTimestamp(list.created_at)}
            </p>
          </div>
        </div>
      </section>
      <section className="w-full max-w-4xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {loading && (
            <p className="text-[#468FAF] text-center col-span-full">
              Loading articles...
            </p>
          )}
        </div>
      </section>

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

export default List;
