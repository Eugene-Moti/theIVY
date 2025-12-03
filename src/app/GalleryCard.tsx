import Image from "next/image";

export default function GalleryCard({ img }: { img: string }) {
  return (
    <div className="bg-[#faf9f5] rounded-2xl shadow-xl p-4 flex flex-col items-center transition hover:shadow-2xl">
      <Image src={img} alt="Gallery" width={400} height={220} className="rounded-xl mb-4 object-cover w-full h-48" />
    </div>
  );
}