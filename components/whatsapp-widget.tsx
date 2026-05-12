"use client";

import { MessageCircle, Send, Sparkles, X } from "lucide-react";
import { useState } from "react";
import { contact } from "@/lib/data";

const quickFaqs = [
  {
    question: "What projects are available?",
    message: "Hello Ivy Group, please share the available projects and current price list."
  },
  {
    question: "Can I get payment plans?",
    message: "Hello Ivy Group, I would like to understand the payment plans for your projects."
  },
  {
    question: "Can I book a site visit?",
    message: "Hello Ivy Group, I would like to book a site visit."
  },
  {
    question: "Where are you located?",
    message: "Hello Ivy Group, please share your office location and viewing schedule."
  }
];

function whatsappHref(message: string) {
  const phone = contact.phone.replace(/\D/g, "");
  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
}

export function WhatsAppWidget() {
  const [open, setOpen] = useState(false);

  return (
    <div className="fixed bottom-20 right-4 z-[60] flex flex-col items-end gap-4 md:bottom-6 md:right-6">
      <div
        className={`w-[min(calc(100vw-2rem),360px)] origin-bottom-right overflow-hidden rounded-lg border border-[#c9a15b]/30 bg-[#0d1110]/92 shadow-[0_24px_80px_rgba(0,0,0,0.42)] backdrop-blur-xl transition duration-300 ${
          open ? "translate-y-0 scale-100 opacity-100" : "pointer-events-none translate-y-4 scale-95 opacity-0"
        }`}
      >
        <div className="border-b border-white/10 bg-gradient-to-r from-[#c9a15b]/18 to-white/[0.03] p-5">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-[#c9a15b]">
                <Sparkles size={14} /> Quick help
              </p>
              <h2 className="mt-2 text-xl font-semibold">Chat with The Ivy Group</h2>
              <p className="mt-2 text-sm leading-6 text-white/64">Choose a quick question and we will open WhatsApp with the message ready.</p>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/12 text-white/70 transition hover:border-[#c9a15b] hover:text-[#c9a15b]"
              aria-label="Close WhatsApp quick help"
            >
              <X size={17} />
            </button>
          </div>
        </div>

        <div className="grid gap-2 p-3">
          {quickFaqs.map((faq) => (
            <a
              key={faq.question}
              href={whatsappHref(faq.message)}
              target="_blank"
              rel="noreferrer noopener"
              className="group flex items-center justify-between gap-4 rounded-lg border border-white/10 bg-white/[0.035] px-4 py-3 text-left text-sm font-semibold text-white/78 transition hover:border-[#c9a15b]/60 hover:bg-[#c9a15b]/10 hover:text-white"
            >
              <span>{faq.question}</span>
              <Send size={16} className="shrink-0 text-[#c9a15b] transition group-hover:translate-x-1" />
            </a>
          ))}
        </div>

        <a
          href={whatsappHref("Hello Ivy Group, I would like to speak with your sales team.")}
          target="_blank"
          rel="noreferrer noopener"
          className="mx-3 mb-3 flex items-center justify-center gap-2 rounded-full bg-[#25d366] px-5 py-3 text-sm font-bold text-[#06140b] transition hover:bg-[#5bed8c]"
        >
          <MessageCircle size={17} /> Start WhatsApp Chat
        </a>
      </div>

      <button
        type="button"
        onClick={() => setOpen((current) => !current)}
        className="group relative flex h-16 w-16 items-center justify-center rounded-full bg-[#25d366] text-[#06140b] shadow-[0_18px_48px_rgba(37,211,102,0.36)] transition hover:-translate-y-1 hover:bg-[#5bed8c]"
        aria-label={open ? "Close WhatsApp quick help" : "Open WhatsApp quick help"}
        aria-expanded={open}
      >
        <span className="pointer-events-none absolute right-full top-1/2 mr-3 -translate-y-1/2 translate-x-2 whitespace-nowrap rounded-full border border-[#c9a15b]/35 bg-[#0d1110]/92 px-4 py-2 text-sm font-bold text-white opacity-0 shadow-[0_12px_36px_rgba(0,0,0,0.34)] backdrop-blur transition duration-300 group-hover:translate-x-0 group-hover:opacity-100">
          Chat with Us
        </span>
        <span className="absolute inset-0 rounded-full border border-[#25d366]/55 animate-ping" />
        <span className="absolute inset-1 rounded-full bg-white/18 opacity-0 transition group-hover:opacity-100" />
        {open ? <X size={28} className="relative" /> : <MessageCircle size={30} className="relative" />}
      </button>
    </div>
  );
}
