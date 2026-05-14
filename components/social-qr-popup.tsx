"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, Facebook, Instagram, Music2, QrCode, X } from "lucide-react";
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { socials } from "@/lib/data";

const qrCodes = [
  {
    label: "Instagram",
    file: "/The Ivygroup/Social media QR Codes/SOCIAL MEDIA INSTAGRAM QR CODE_page-0001.jpg",
    accent: "#c86aa8",
    icon: Instagram
  },
  {
    label: "TikTok",
    file: "/The Ivygroup/Social media QR Codes/SOCIAL MEDIA TIKTOK QR CODE_page-0001.jpg",
    accent: "#5ee4d6",
    icon: Music2
  },
  {
    label: "Facebook",
    file: "/The Ivygroup/Social media QR Codes/SOCIAL MEDIA FACEBOOK QR CODE_page-0001.jpg",
    accent: "#6ea8ff",
    icon: Facebook
  }
];

const storageKey = "ivy-social-qr-dismissed-v2";
const reminderKey = "ivy-social-qr-remind-after-v2";
const autoOpenDelay = 10 * 1000;
const triggerDelay = 4500;
const remindLaterDelay = 90 * 1000;
const qrRotationDelay = 15 * 1000;

export function SocialQrPopup() {
  const [open, setOpen] = useState(false);
  const [showTrigger, setShowTrigger] = useState(false);
  const [active, setActive] = useState(qrCodes[0].label);
  const prefersReducedMotion = useReducedMotion();

  const activeQr = useMemo(() => qrCodes.find((item) => item.label === active) ?? qrCodes[0], [active]);
  const socialHref = socials.find(([label]) => label === activeQr.label)?.[1] ?? "#";

  useEffect(() => {
    const triggerTimer = window.setTimeout(() => setShowTrigger(true), triggerDelay);
    const autoTimer = window.setTimeout(() => {
      const remindAfter = Number(window.localStorage.getItem(reminderKey) ?? 0);

      if (window.localStorage.getItem(storageKey) !== "true" && Date.now() > remindAfter) {
        setOpen(true);
      }
    }, autoOpenDelay);

    return () => {
      window.clearTimeout(triggerTimer);
      window.clearTimeout(autoTimer);
    };
  }, []);

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        remindLater();
      }
    }

    if (open) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;

    const rotationTimer = window.setInterval(() => {
      setActive((current) => {
        const currentIndex = qrCodes.findIndex((item) => item.label === current);
        return qrCodes[(currentIndex + 1) % qrCodes.length].label;
      });
    }, qrRotationDelay);

    return () => window.clearInterval(rotationTimer);
  }, [open]);

  function remindLater() {
    window.localStorage.setItem(reminderKey, String(Date.now() + remindLaterDelay));
    setOpen(false);
    setShowTrigger(true);
  }

  function dismissPermanently() {
    window.localStorage.setItem(storageKey, "true");
    setOpen(false);
    setShowTrigger(false);
  }

  function openManually() {
    setShowTrigger(true);
    setOpen(true);
  }

  const springTransition = prefersReducedMotion
    ? { duration: 0.01 }
    : { type: "spring" as const, stiffness: 250, damping: 24 };

  return (
    <>
      <AnimatePresence>
        {showTrigger && !open && (
          <motion.button
            type="button"
            onClick={openManually}
            className="fixed bottom-20 left-4 z-40 inline-flex items-center gap-2 overflow-hidden rounded-full border border-[#c9a15b]/45 bg-[#0d1110]/88 px-4 py-3 text-sm font-bold text-white shadow-[0_18px_44px_rgba(0,0,0,0.36)] backdrop-blur-xl transition hover:border-[#e2bd75] md:bottom-6 md:left-6"
            initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, x: -24, scale: 0.94 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: -18, scale: 0.96 }}
            transition={springTransition}
            aria-label="Open social media QR codes"
          >
            <span className="absolute inset-y-0 left-0 w-14 bg-[#c9a15b]/18 blur-xl" />
            <QrCode size={18} className="relative text-[#c9a15b]" />
            <span className="relative">Follow updates</span>
          </motion.button>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[90] flex items-center justify-center bg-[#050706]/72 px-4 py-8 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-labelledby="social-qr-title"
              className="relative w-full max-w-4xl overflow-hidden rounded-lg border border-white/12 bg-[#0d1110] text-white shadow-[0_34px_120px_rgba(0,0,0,0.55)]"
              initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 26, scale: 0.97, rotateX: 4 }}
              animate={{ opacity: 1, y: 0, scale: 1, rotateX: 0 }}
              exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 18, scale: 0.98 }}
              transition={springTransition}
            >
              <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(110deg,rgba(201,161,91,0.16),transparent_34%,rgba(94,228,214,0.08)_68%,transparent)]" />
              <div className="pointer-events-none absolute left-0 right-0 top-0 h-px bg-gradient-to-r from-transparent via-[#c9a15b] to-transparent" />

              <div className="relative grid lg:grid-cols-[0.92fr_1.08fr]">
                <div className="border-b border-white/10 p-6 sm:p-8 lg:border-b-0 lg:border-r">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="eyebrow">Stay connected</p>
                      <h2 id="social-qr-title" className="mt-3 font-serif text-4xl font-semibold leading-tight">
                        Scan and follow The Ivy Group.
                      </h2>
                      <p className="mt-4 text-sm leading-6 text-white/64">
                        Get project updates, launch moments, lifestyle previews, and buyer guidance on your preferred channel.
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={remindLater}
                      className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/12 text-white/70 transition hover:border-[#c9a15b] hover:text-[#c9a15b]"
                      aria-label="Remind me later"
                    >
                      <X size={18} />
                    </button>
                  </div>

                  <div className="mt-7 grid gap-3">
                    {qrCodes.map((item, index) => {
                      const Icon = item.icon;
                      const isActive = item.label === activeQr.label;

                      return (
                        <motion.button
                          key={item.label}
                          type="button"
                          onClick={() => setActive(item.label)}
                          className={`flex items-center justify-between rounded-lg border px-4 py-3 text-left transition ${
                            isActive
                              ? "border-[#c9a15b] bg-white/[0.08] text-white"
                              : "border-white/10 bg-white/[0.035] text-white/68 hover:border-white/24 hover:text-white"
                          }`}
                          initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, x: -12 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: prefersReducedMotion ? 0 : 0.08 + index * 0.05 }}
                        >
                          <span className="flex items-center gap-3">
                            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white/[0.06]" style={{ color: item.accent }}>
                              <Icon size={18} />
                            </span>
                            <span className="font-bold">{item.label}</span>
                          </span>
                          <QrCode size={17} className={isActive ? "text-[#c9a15b]" : "text-white/38"} />
                        </motion.button>
                      );
                    })}
                  </div>

                  <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                    <a
                      href={socialHref}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="inline-flex items-center justify-center gap-2 rounded-full bg-[#c9a15b] px-5 py-3 text-sm font-bold text-[#111] transition hover:bg-[#e2bd75]"
                    >
                      Open {activeQr.label} <ArrowUpRight size={16} />
                    </a>
                    <button
                      type="button"
                      onClick={remindLater}
                      className="inline-flex items-center justify-center rounded-full border border-white/15 px-5 py-3 text-sm font-bold text-white/76 transition hover:border-[#c9a15b] hover:text-white"
                    >
                      Remind me later
                    </button>
                  </div>
                  <button type="button" onClick={dismissPermanently} className="mt-4 text-sm font-semibold text-white/42 transition hover:text-white/72">
                    Don't show again
                  </button>
                </div>

                <div className="relative min-h-[420px] p-6 sm:p-8">
                  <div className="absolute inset-x-8 top-8 h-20 rounded-full opacity-40 blur-3xl" style={{ background: activeQr.accent }} />
                  <div className="relative mx-auto flex max-w-sm flex-col items-center">
                    <div className="relative w-full overflow-hidden rounded-lg border border-white/14 bg-white p-4 shadow-[0_22px_70px_rgba(0,0,0,0.32)]">
                      <div className="pointer-events-none absolute inset-x-0 top-0 z-10 h-16 bg-gradient-to-b from-white to-white/0" />
                      <AnimatePresence mode="wait">
                        <motion.div
                          key={activeQr.label}
                          className="relative aspect-square w-full overflow-hidden rounded-md bg-white"
                          initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, x: 42, scale: 0.94, rotate: 1.5 }}
                          animate={{ opacity: 1, x: 0, scale: 1, rotate: 0 }}
                          exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, x: -42, scale: 0.96, rotate: -1.5 }}
                          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                        >
                          <Image
                            src={activeQr.file}
                            alt={`${activeQr.label} QR code for The Ivy Group`}
                            fill
                            sizes="(max-width: 640px) 80vw, 360px"
                            className="object-contain"
                          />
                        </motion.div>
                      </AnimatePresence>
                      <motion.div
                        className="pointer-events-none absolute left-4 right-4 h-px bg-gradient-to-r from-transparent via-[#c9a15b] to-transparent"
                        animate={prefersReducedMotion ? { top: "50%" } : { top: ["18%", "82%", "18%"] }}
                        transition={{ duration: 3.8, repeat: Infinity, ease: "easeInOut" }}
                      />
                    </div>
                    <div className="mt-4 h-1 w-full max-w-sm overflow-hidden rounded-full bg-white/10">
                      <motion.div
                        key={activeQr.label}
                        className="h-full origin-left rounded-full"
                        style={{ background: activeQr.accent }}
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        transition={{ duration: prefersReducedMotion ? 0.01 : 15, ease: "linear" }}
                      />
                    </div>
                    <p className="mt-5 text-center text-sm leading-6 text-white/58">
                      Point your camera at the code, or use the button if you are browsing on your phone.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
