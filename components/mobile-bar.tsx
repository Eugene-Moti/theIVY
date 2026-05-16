"use client";

import { MessageCircle, Phone, Send, Share2 } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";
import { contact } from "@/lib/data";

export function MobileBar() {
  const shareSite = async () => {
    if (navigator.share) {
      await navigator.share({
        title: "The Ivy Group",
        text: "Explore The Ivy Group residences in Nairobi.",
        url: window.location.origin
      });
      return;
    }

    await navigator.clipboard?.writeText(window.location.origin);
  };

  return (
    <motion.div
      className="mobile-dock fixed inset-x-3 bottom-3 z-50 grid grid-cols-4 overflow-hidden rounded-full border border-white/12 bg-[#0d1110]/88 p-1 text-[0.68rem] font-bold shadow-[0_16px_55px_rgba(0,0,0,0.42)] backdrop-blur-2xl md:hidden"
      initial={{ y: 34, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.45, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
    >
      <a href={`tel:${contact.phone.replaceAll(" ", "")}`} className="mobile-dock-item">
        <Phone size={15} /> Call
      </a>
      <a href={contact.whatsapp} className="mobile-dock-item">
        <MessageCircle size={15} /> Chat
      </a>
      <button type="button" onClick={shareSite} className="mobile-dock-item">
        <Share2 size={15} /> Share
      </button>
      <Link href="/contact" className="mobile-dock-item bg-[#c9a15b] text-[#111]">
        <Send size={15} /> Enquire
      </Link>
    </motion.div>
  );
}
