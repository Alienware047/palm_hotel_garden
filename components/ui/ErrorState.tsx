import { RefreshCcw } from "lucide-react";

export default function ErrorState({
  message,
  onRetry,
}: {
  message: string;
  onRetry: () => void;
}) {
  return (
    <div className="flex flex-col items-center gap-4 py-12 text-center">
      <p className="text-red-500 font-medium">{message}</p>

      <button
        onClick={onRetry}
        className="flex items-center gap-2 px-4 py-2 rounded-xl border border-primary text-primary hover:bg-primary hover:text-white transition"
      >
        <RefreshCcw size={16} />
        Retry
      </button>
    </div>
  );
}
