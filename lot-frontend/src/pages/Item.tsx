import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import type { Item, Tag, User } from "../utils/types/database";
import { formatTimestamp } from "../utils/time";

type ItemswithTags = Item & {
  tags: Tag[];
  current_user: User;
};

const Itempage: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [errorsState, setErrorState] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string>();
  const [item, setItem] = useState<ItemswithTags>({
    id: 4334,
    link: "afhgaifg",
    name: "string",
    url_safe_name: "jghghdfd",
    image_url:
      "https://photo.uncommmon.dev/i/b2d0a833-cff8-4e31-b530-5cf2248bf80b.jpg",
    price: "£39",
    content: "for project",
    user_id: 20,
    created_at: "ciasbac",
    tags: [
      {
        id: 424242,
        name: "jnvisvosnv",
        url_safe_name: "visnivsv",
        colour_hex: "800080",
        user_id: 20,
        created_at: "iwhbhv",
      },
      {
        id: 424242,
        name: "jnvisvosnv2",
        url_safe_name: "visnivsv",
        colour_hex: "B39EB5",
        user_id: 20,
        created_at: "iwhbhv",
      },
    ],
    current_user: {
      id: 20,
      email: "bjvikbvsv",
      created_at: "string",
    },
  });

  const { userid, slug } = useParams();
  const token = localStorage.getItem("authToken") ?? "noToken";

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const body = JSON.stringify({ userid, slug });

        const response = await fetch("/api/items/get-one", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: body,
        });

        const data = await response.json();

        if (data.success) {
          setItem(data.item);
        } else {
          setErrorState(true);
          setErrorMsg(data.errormsg);
        }
      } catch (err) {
        console.error("Failed to fetch item:", err);
        setErrorState(true);
        setErrorMsg("Failed to fetch");
      } finally {
        setLoading(false);
      }
    };

    fetchItem();
  }, []);

  return (
    <div className="min-h-screen bg-[#f0f6fb] p-6 flex flex-col items-center space-y-10">
      {errorsState && (
        <section className="w-full block bg-white rounded-2xl shadow-lg overflow-hidden transition-shadow duration-300">
          <h2>Error</h2>
          <p>{errorMsg}</p>
        </section>
      )}
      <section className="w-full max-w-4xl">
        <div
          key={item.name}
          className="block bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
        >
          {item.image_url && (
            <img
              src={item.image_url}
              alt={item.name}
              className="w-full h-fit p-5 object-cover"
            />
          )}
          <div className="pb-6 pl-6 pr-6">
            <h2 className="text-4xl font-semibold text-[#2C7DA0] mb-2">
              {item.name}
            </h2>
            <a href={`${item.link}`}>
              <h6>{item.link}</h6>
            </a>
            <h5>{item.price}</h5>
            <p className="text-gray-700 py-2 text-xl leading-relaxed">
              {item.content}
            </p>
            {item.user_id === item.current_user.id && (
              <div className="inline-flex items-center gap-5 pb-5">
                <h5 className="">TAG'S</h5>
                {item.tags.map((tag) => (
                  <a
                    key={`${tag.id}`}
                    href={`/tags/${tag.user_id}/${tag.url_safe_name}`}
                    className="flex items-center"
                  >
                    <h6
                      style={{ backgroundColor: `#${tag.colour_hex}` }}
                      className="px-3 py-2 text-gray-900 rounded-full hover:shadow-xl transition"
                    >
                      {tag.name}
                    </h6>
                  </a>
                ))}
              </div>
            )}
            <p className="text-gray-700 text-sm leading-relaxed">
              {formatTimestamp(item.created_at)}
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Itempage;
