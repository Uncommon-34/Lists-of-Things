// File: /pages/index.tsx
import { useState } from "react";

const ProductPage: React.FC = () => {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<{
    title: string;
    image: string;
    price: string;
  } | null>(null);
  const [error, setError] = useState<string | null>(null);

  const fetchProductInfo = async () => {
    setLoading(true);
    setError(null);
    setData(null);
    try {
      const res = await fetch("/api/misc/parse-product-url", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url }),
      });
      if (!res.ok) throw new Error("Failed to fetch product data");
      const json = await res.json();
      setData(json);
    } catch (err: any) {
      setError(err.message || "Unknown error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "2rem", maxWidth: "600px", margin: "0 auto" }}>
      <h1>Product Fetcher</h1>
      <input
        type="text"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        placeholder="Paste product URL..."
        style={{ width: "100%", padding: "0.5rem" }}
      />
      <button
        onClick={fetchProductInfo}
        disabled={loading || !url}
        style={{ marginTop: "1rem" }}
      >
        {loading ? "Loading..." : "Fetch Product Info"}
      </button>

      {error && <p style={{ color: "red" }}>{error}</p>}
      {data && (
        <div style={{ marginTop: "2rem" }}>
          <h2>{data.title}</h2>
          <img src={data.image} alt={data.title} style={{ maxWidth: "100%" }} />
          <p>
            <strong>Price:</strong> {data.price}
          </p>
        </div>
      )}
    </div>
  );
};

export default ProductPage;
