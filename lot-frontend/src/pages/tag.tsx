import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import type { Item, Tag, User } from "../utils/types/database";
import { formatTimestamp } from "../utils/time";

type TagWithItems = Tag & {
  current_user: User;
  items: Item[];
};

const Tagpage: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const { userid, slug } = useParams();
  const [Tag, setTag] = useState<TagWithItems>({
    id: 345343,
    name: "Test Title",
    url_safe_name: "testing",
    colour_hex: "800080",
    user_id: 23234234,
    created_at: "now",
    current_user: {
      id: 65366,
      email: "bjvikbvsv",
      created_at: "string",
    },
    items: [
      {
        id: 5435343455,
        link: "A awsome link",
        name: "item name",
        url_safe_name: "same_item_name",
        image_url:
          "https://photo.uncommmon.dev/i/b2d0a833-cff8-4e31-b530-5cf2248bf80b.jpg",
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
        image_url:
          "https://photo.uncommmon.dev/i/b2d0a833-cff8-4e31-b530-5cf2248bf80b.jpg",
        price: "£20",
        content: "kgfbbfgwiegf ighfiagff wfygwefg WFafge",
        user_id: 20,
        created_at: "5435343455",
      },
    ],
  });
  const [errorsState, setErrorState] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string>();

  const token = localStorage.getItem("authToken") ?? "noToken";

  useEffect(() => {
    const loadTags = async () => {
      try {
        setLoading(true);
        const body = JSON.stringify({ userid, slug });
        const res = await fetch("/api/Tags/get-one", {
          method: "get",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: body,
        });
        const data = await res.json();
        if (data.errormsg) {
          setErrorState(true);
          setErrorMsg(data.errormsg);
        } else {
          setTag(data);
        }
      } catch (err) {
        console.error("Failed to fetch:", err);
        // setErrorState(true);
        // setErrorMsg(`Failed to fetch`);
      } finally {
        setLoading(false);
      }
    };

    loadTags();
  }, []);

  return (
    <div className="min-h-screen bg-blue-400 p-6 flex flex-col items-center space-y-10">
      {!errorsState && (
        <div>
          <section className="w-full">
            <div className="block bg-white rounded-2xl shadow-lg overflow-hidden transition-shadow duration-300">
              {loading && (
                <p className="text-[#468FAF] text-center col-span-full">
                  Loading Tag Details...
                </p>
              )}
              <div className="items-center gap-5 pl-5">
                {Tag.colour_hex && (
                  <div
                    style={{ backgroundColor: `#${Tag.colour_hex}` }}
                    className={`p-8 mt-3 rounded-2xl w-[98%]`}
                  />
                )}
                <h2 className="text-4xl font-semibold text-[#2C7DA0] mb-2">
                  {Tag.name}
                </h2>
              </div>
              <div className="pb-6 pl-6 pr-6">
                <p className="text-gray-700 text-sm leading-relaxed">
                  {formatTimestamp(Tag.created_at)}
                </p>
              </div>
            </div>
          </section>

          <section className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-4 gap-6 pb-20 pt-10">
            {loading && (
              <p className="text-[#468FAF] text-center col-span-full">
                Loading Tag Items...
              </p>
            )}
            {Tag.items.map((Item) => (
              <a href={`/items/${Item.user_id}/${Item.url_safe_name}`}>
                <div
                  key={Item.url_safe_name}
                  className="block bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
                >
                  {Item.image_url && (
                    <img
                      src={Item.image_url}
                      alt={Item.name}
                      className="w-full h-48 p-5 object-cover"
                    />
                  )}

                  <div className="pb-6 pl-6 pr-6">
                    <h4 className="font-semibold text-[#2C7DA0] mb-2">
                      {Item.name}
                    </h4>
                    <p className="text-gray-950 text-[1.3vh] leading-relaxed">
                      {Item.price}
                    </p>
                    <p className="text-gray-700 text-xl leading-relaxed">
                      {Item.content}
                    </p>
                    <p className="text-gray-700 text-sm leading-relaxed">
                      {formatTimestamp(Item.created_at)}
                    </p>
                  </div>
                </div>
              </a>
            ))}
          </section>
        </div>
      )}

      {errorsState && (
        <section className="w-full block bg-white rounded-2xl shadow-lg overflow-hidden transition-shadow duration-300">
          <h2>Error</h2>
          <p>{errorMsg}</p>
        </section>
      )}
    </div>
  );
};

export default Tagpage;
