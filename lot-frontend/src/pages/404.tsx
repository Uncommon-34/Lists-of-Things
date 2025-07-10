import { AlertTriangle } from "lucide-react";

// if the slug dosent match anything it sends them here to a not found page
export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#A9D6E5] flex flex-col items-center justify-center px-4 text-center">
      <AlertTriangle className="w-16 h-16 text-yellow-500 mb-4" />
      <h1 className="text-2x1 font-bold mb-2">404 - Page Not Found</h1>
      <p className="text-muted-foreground mb-6 max-w-md">
        Oops! The page you're looking for doesn't exist, has been moved or is
        yet to be made!.
      </p>

      <button
        onClick={() => (window.location.href = "/")}
        className="bg-white text-[#2C7DA0] px-6 py-2 rounded-xl shadow hover:-translate-y-1 hover:shadow-lg transform transition"
      >
        Go back home
      </button>
    </div>
  );
}
