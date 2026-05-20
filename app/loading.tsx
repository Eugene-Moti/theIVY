export default function Loading() {
  return (
    <div className="flex min-h-[70vh] items-center justify-center bg-[#0d1110] px-6 text-center text-white">
      <div className="w-full max-w-sm">
        <div className="mx-auto h-12 w-12 rounded-full border-2 border-white/16 border-t-[#c9a15b] animate-spin" />
        <p className="mt-6 text-sm font-bold uppercase tracking-[0.18em] text-[#c9a15b]">Loading</p>
        <p className="mt-3 text-sm leading-6 text-white/58">Preparing The Ivy Group experience...</p>
      </div>
    </div>
  );
}
