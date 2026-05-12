export default function Loading() {
  return (
    <div className="container py-20">
      <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="h-[420px] w-full animate-pulse rounded-xl bg-[#1A1A1A]" aria-hidden="true" />
        <div className="space-y-4">
          <div className="h-10 w-full animate-pulse rounded-lg bg-[#1A1A1A]" aria-hidden="true" />
          <div className="h-6 w-4/5 animate-pulse rounded-lg bg-[#1A1A1A]" aria-hidden="true" />
          <div className="grid grid-cols-3 gap-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="h-20 animate-pulse rounded-lg bg-[#1A1A1A]" aria-hidden="true" />
            ))}
          </div>
          <div className="h-12 w-full animate-pulse rounded-lg bg-[#1A1A1A]" aria-hidden="true" />
        </div>
      </div>
    </div>
  );
}

