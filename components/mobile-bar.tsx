import { MessageCircle, Phone, Send } from "lucide-react";
import Link from "next/link";
import { contact } from "@/lib/data";

export function MobileBar() {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 grid grid-cols-3 border-t border-white/10 bg-[#0d1110] text-xs font-bold md:hidden">
      <a href={`tel:${contact.phone.replaceAll(" ", "")}`} className="flex items-center justify-center gap-2 py-3"><Phone size={15} /> Call</a>
      <a href={contact.whatsapp} className="flex items-center justify-center gap-2 border-x border-white/10 py-3"><MessageCircle size={15} /> WhatsApp</a>
      <Link href="/contact" className="flex items-center justify-center gap-2 bg-[#c9a15b] py-3 text-[#111]"><Send size={15} /> Enquire</Link>
    </div>
  );
}
