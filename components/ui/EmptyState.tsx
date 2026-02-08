export default function EmptyState({ label }: { label: string }) {
  return (
    <div className="text-center py-12 text-foreground/60">
      {label}
    </div>
  );
}
