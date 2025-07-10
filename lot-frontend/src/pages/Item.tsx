import React, { useEffect, useState } from "react";

const Item: React.FC = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeaturedArticles = async () => {
      try {
      } catch (err) {
        console.error("Failed to fetch articles:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturedArticles();
  }, []);

  return (
    <div className="min-h-screen bg-[#f0f6fb] p-6 flex flex-col items-center space-y-10">
      <section className="w-full max-w-4xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {loading && (
            <p className="text-[#468FAF] text-center col-span-full">
              Loading articles...
            </p>
          )}
        </div>
      </section>
    </div>
  );
};

export default Item;
