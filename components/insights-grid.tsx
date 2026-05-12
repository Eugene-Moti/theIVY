"use client";

import Image from "next/image";
import { Eye, Heart, MessageCircle } from "lucide-react";
import { useState } from "react";
import { blogPosts } from "@/lib/data";

export function InsightsGrid() {
  const [likes, setLikes] = useState(() => blogPosts.map((post) => post.likes));

  function incrementLikes(index: number) {
    setLikes((current) => current.map((value, itemIndex) => (itemIndex === index ? value + 1 : value)));
  }

  return (
    <div className="mt-12 grid gap-6 md:grid-cols-2">
      {blogPosts.map((post, index) => (
        <article key={post.title} className={`overflow-hidden rounded-lg border border-[#d8c49a]/25 bg-[#111815] text-white shadow-[0_18px_50px_rgba(36,28,12,0.14)] ${index === 0 ? "md:col-span-2 lg:grid lg:grid-cols-[1.05fr_0.95fr]" : ""}`}>
          <div className={`relative ${index === 0 ? "min-h-[420px]" : "h-72"}`}>
            <Image src={post.image} alt={post.title} fill sizes={index === 0 ? "100vw" : "(max-width: 768px) 100vw, 50vw"} className="object-cover" />
          </div>
          <div className="p-6 md:p-8">
            <div className="flex items-center gap-3">
              <span className="relative flex h-10 w-10 overflow-hidden rounded-full border border-[#c9a15b]/45 bg-[#111815]">
                <Image src={post.authorImage} alt={post.author} fill sizes="40px" className="object-contain p-1.5" />
              </span>
              <div>
                <p className="text-sm font-bold text-white">{post.author}</p>
                <p className="text-xs uppercase tracking-[0.16em] text-[#c9a15b]">Ivy Journal</p>
              </div>
            </div>
            <h2 className="mt-5 font-serif text-3xl font-semibold">{post.title}</h2>
            <p className="mt-4 leading-7 text-white/66">{post.excerpt}</p>
            <div className="mt-6 flex flex-wrap gap-4 border-t border-white/10 pt-5 text-sm text-white/62">
              <span className="flex items-center gap-2"><Eye size={17} className="text-[#c9a15b]" /> {post.views}</span>
              <span className="flex items-center gap-2"><MessageCircle size={17} className="text-[#c9a15b]" /> {post.comments}</span>
              <button
                type="button"
                onClick={() => incrementLikes(index)}
                className="group flex items-center gap-2 rounded-full transition hover:text-white"
                aria-label={`Like ${post.title}`}
              >
                <Heart size={17} className="text-[#c9a15b] transition group-hover:scale-110 group-hover:fill-[#c9a15b]" />
                {likes[index]}
              </button>
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}
