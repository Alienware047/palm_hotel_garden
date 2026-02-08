export default function LoadingGrid() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      {[...Array(3)].map((_, i) => (
        <div
          key={i}
          className="h-72 rounded-2xl bg-muted animate-pulse"
        />
      ))}
    </div>
  );
}
