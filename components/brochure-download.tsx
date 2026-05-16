"use client";

import { Download, FileText, X } from "lucide-react";
import { FormEvent, useState } from "react";
import { contact } from "@/lib/data";

type BrochureDownloadProps = {
  brochure: string;
  projectName: string;
  variant?: "gold" | "outline" | "dark";
  label?: string;
};

function whatsappHref(projectName: string, name: string, phone: string, email: string) {
  const companyPhone = contact.phone.replace(/\D/g, "");
  const message = [
    `Hello Ivy Group, I downloaded the ${projectName} brochure.`,
    `Name: ${name}`,
    `Phone: ${phone}`,
    `Email: ${email}`
  ].join("\n");

  return `https://wa.me/${companyPhone}?text=${encodeURIComponent(message)}`;
}

export function BrochureDownload({ brochure, projectName, variant = "gold", label = "Download Brochure" }: BrochureDownloadProps) {
  const [open, setOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const buttonClass =
    variant === "outline"
      ? "rounded-full border border-white/25 px-6 py-4 font-bold text-white transition hover:border-[#c9a15b] hover:text-[#c9a15b]"
      : variant === "dark"
        ? "rounded-full border border-[#c9a15b] px-6 py-3 font-bold text-[#c9a15b] transition hover:bg-[#c9a15b] hover:text-[#111]"
        : "gold-gradient rounded-full px-6 py-4 font-bold text-[#111]";

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const name = String(formData.get("name") ?? "");
    const phone = String(formData.get("phone") ?? "");
    const email = String(formData.get("email") ?? "");

    setSubmitted(true);
    window.open(whatsappHref(projectName, name, phone, email), "_blank", "noopener,noreferrer");
    window.open(brochure, "_blank", "noopener,noreferrer");
  }

  return (
    <>
      <button type="button" onClick={() => setOpen(true)} className={`mobile-tap inline-flex min-h-12 items-center justify-center gap-2 ${buttonClass}`}>
        <Download size={18} /> {label}
      </button>

      {open && (
        <div className="fixed inset-0 z-[80] flex items-center justify-center bg-black/65 px-4 py-8 backdrop-blur-sm max-md:items-end max-md:pb-4">
          <div className="w-full max-w-lg overflow-hidden rounded-lg border border-[#c9a15b]/30 bg-[#0d1110] text-white shadow-[0_30px_90px_rgba(0,0,0,0.45)]">
            <div className="flex items-start justify-between gap-4 border-b border-white/10 bg-white/[0.04] p-5 md:p-6">
              <div>
                <p className="flex items-center gap-2 text-sm font-bold uppercase tracking-[0.16em] text-[#c9a15b]">
                  <FileText size={16} /> Brochure access
                </p>
                <h2 className="mt-3 text-2xl font-semibold">{projectName}</h2>
                <p className="mt-2 text-sm leading-6 text-white/62">Share your contact details and the brochure will open immediately.</p>
              </div>
              <button type="button" onClick={() => setOpen(false)} className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/12 text-white/70 transition hover:border-[#c9a15b] hover:text-[#c9a15b]" aria-label="Close brochure form">
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="grid gap-3 p-5 md:p-6">
              <input name="name" required placeholder="Full name" className="rounded-md border border-white/10 bg-white/8 px-4 py-3 text-sm text-white outline-none placeholder:text-white/45 focus:border-[#c9a15b]" />
              <input name="phone" required placeholder="Phone number" className="rounded-md border border-white/10 bg-white/8 px-4 py-3 text-sm text-white outline-none placeholder:text-white/45 focus:border-[#c9a15b]" />
              <input name="email" required type="email" placeholder="Email address" className="rounded-md border border-white/10 bg-white/8 px-4 py-3 text-sm text-white outline-none placeholder:text-white/45 focus:border-[#c9a15b]" />
              <button type="submit" className="gold-gradient mobile-tap mt-2 inline-flex min-h-12 items-center justify-center gap-2 rounded-md px-5 py-3 text-sm font-bold text-[#111]">
                <Download size={16} /> Submit & Download
              </button>
              {submitted && <p className="text-sm text-white/58">Your brochure is opening in a new tab. Please allow pop-ups if your browser blocks it.</p>}
            </form>
          </div>
        </div>
      )}
    </>
  );
}
