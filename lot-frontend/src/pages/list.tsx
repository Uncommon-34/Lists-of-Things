import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import type { Item, List, Tag, User } from "../utils/types/database";
import {
  Globe,
  GlobeLock,
  User as Usericon,
  UserLock,
  UserMinus,
  UserPlus,
  X,
} from "lucide-react";
import { formatTimestamp } from "../utils/time";

type ListWithItems = List & {
  tags: Tag[];
  owner: User;
  other_accsess?: boolean;
  other_accsess_users?: User[];
  current_user: User;
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
    tags: [
      {
        id: 424242,
        name: "jnvisvosnv",
        url_safe_name: "visnivsv",
        colour_hex: "#000",
        user_id: 20,
        created_at: "iwhbhv",
      },
      {
        id: 424242,
        name: "jnvisvosnv2",
        url_safe_name: "visnivsv",
        colour_hex: "#000",
        user_id: 20,
        created_at: "iwhbhv",
      },
    ],
    owner: {
      id: 65366,
      email: "bjvikbvsv",
      created_at: "string",
    },
    other_accsess: true,
    other_accsess_users: [
      {
        id: 65366,
        email: "bjvikbvsv",
        created_at: "string",
      },
      {
        id: 65366,
        email: "bjvikbvsv",
        created_at: "string",
      },
      {
        id: 65366,
        email: "bjvikbvsv",
        created_at: "string",
      },
    ],
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
  const [userAccsessPop, setUserAccsessPop] = useState<boolean>(false);
  const [userAccsessMsg, setUserAccsessMsg] = useState<string>("");
  const [userAccsessAdd, setUserAccsessAdd] = useState<string>("");
  const [userAccsessAddMsg, setUserAccsessAddMsg] = useState<string>("");
  const [errorsState, setErrorState] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string>();

  const location = window.location.origin;
  const token = localStorage.getItem("authToken") ?? "noToken";

  const handleUserAccsessAdd = async () => {
    try {
      const body = JSON.stringify({ add: userAccsessAdd });

      const response = await fetch("/api/lists/addaccsess", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: body,
      });

      const data = await response.json();

      if (data.success) {
        setUserAccsessAddMsg("Sucsesssfully added user");
        list.other_accsess_users?.push(data.user);
      } else {
        setUserAccsessAddMsg("Invalid email or user dosnt have an account");
      }
    } catch (err) {
      setUserAccsessAddMsg("An error occurred. Please try again.");
    }
  };
  const handleUserAccsessRemove = async (userid: number) => {
    try {
      const body = JSON.stringify({ remove: userid });

      const response = await fetch("/api/lists/removeaccsess", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: body,
      });

      const data = await response.json();

      if (data.success) {
        setUserAccsessAddMsg("Sucsesssfully removed user");
        list.other_accsess_users = list.other_accsess_users?.filter(
          (u) => u.id !== userid
        );
      } else {
        setUserAccsessAddMsg("something went wrong");
      }
    } catch (err) {
      setUserAccsessAddMsg("An error occurred. Please try again.");
    }
  };

  useEffect(() => {
    const loadLists = async () => {
      try {
        setLoading(true);
        const body = JSON.stringify({ userid, slug });
        const res = await fetch("/api/lists/get-one", {
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
          setList(data);
        }
      } catch (err) {
        console.error("Failed to fetch:", err);
        // setErrorState(true);
        // setErrorMsg(`Failed to fetch`);
      } finally {
        setLoading(false);
      }
    };
    if (!list.other_accsess) {
      setUserAccsessMsg("Add Users To access the list");
    } else if (list.other_accsess) {
      setUserAccsessMsg("Users with access");
    }

    loadLists();
  }, []);

  return (
    <div className="min-h-screen bg-blue-400 p-6 flex flex-col items-center space-y-10">
      {!errorsState && (
        <div>
          <section className="w-full">
            <div className="block bg-white rounded-2xl shadow-lg overflow-hidden transition-shadow duration-300">
              {loading && (
                <p className="text-[#468FAF] text-center col-span-full">
                  Loading List Details...
                </p>
              )}
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
                {list.owner.id === list.current_user.id &&
                  list.other_accsess && (
                    <>
                      {list.other_accsess && (
                        <button
                          onClick={() => setUserAccsessPop(true)}
                          className="flex items-center"
                        >
                          <Usericon />
                        </button>
                      )}
                      {!list.other_accsess && (
                        <button
                          onClick={() => setUserAccsessPop(true)}
                          className="flex items-center"
                        >
                          <UserLock />
                        </button>
                      )}
                    </>
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
          <section className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-4 gap-6 pb-20 pt-10">
            {loading && (
              <p className="text-[#468FAF] text-center col-span-full">
                Loading List Items...
              </p>
            )}
            {list.items.map((Item) => (
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
              <X />
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
        </div>
      )}

      {userAccsessPop && (
        <div className="fixed inset-0 z-50 flex justify-center items-center">
          <div
            className="absolute inset-0 bg-black opacity-50"
            onClick={() => setUserAccsessPop(false)}
          ></div>

          <div className="bg-white rounded-xl p-6 w-full max-w-sm shadow-lg relative z-60">
            <button
              onClick={() => setUserAccsessPop(false)}
              className="absolute top-2 right-3 text-gray-500 hover:text-black text-lg"
            >
              <X />
            </button>

            <h2 className="text-xl font-bold text-[#2C7DA0] mb-4">
              {userAccsessMsg}
            </h2>

            <div className="flex items-center space-x-2 mb-2">
              <input
                type="email"
                onChange={(e) => setUserAccsessAdd(e.target.value)}
                className="flex-1 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#2C7DA0] overflow-x-auto whitespace-nowrap"
              />
              <button
                onClick={async () => {
                  handleUserAccsessAdd;
                }}
                className="px-3 py-2 bg-[#2C7DA0] text-white rounded-lg hover:bg-[#468FAF] transition"
              >
                <UserPlus />
              </button>
            </div>
            <p>{userAccsessAddMsg}</p>
            {list.other_accsess_users &&
              list.other_accsess_users.length > 0 && (
                <div className="w-full max-w-4xl pt-5">
                  <div className="h-[200px] overflow-y-auto grid grid-cols-1 gap-2">
                    {list.other_accsess_users.map((user) => (
                      <div
                        key={user.id}
                        className="flex justify-between items-center bg-orange-200 rounded-2xl shadow-lg p-2"
                      >
                        <div>
                          <h4>{user.email}</h4>
                          <p>{formatTimestamp(user.created_at)}</p>
                        </div>
                        <button
                          className="px-3 py-2 bg-[#ebb549] text-white rounded-lg hover:bg-[#e7e497] transition"
                          onClick={() => {
                            handleUserAccsessRemove(user.id);
                          }}
                        >
                          <UserMinus />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
          </div>
        </div>
      )}
    </div>
  );
};

export default List;
