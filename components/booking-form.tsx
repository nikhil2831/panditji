"use client";

import { useState } from "react";
import type { PoojaService } from "@/types/pooja";

type BookingFormProps = {
  services: PoojaService[];
};

type SubmitState = "idle" | "submitting" | "success" | "error";

type Toast = {
  id: string;
  message: string;
  type: "success" | "error";
};

export function BookingForm({ services }: BookingFormProps) {
  const [state, setState] = useState<SubmitState>("idle");
  const [toasts, setToasts] = useState<Toast[]>([]);

  const showToast = (message: string, type: "success" | "error") => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, message, type }]);

    // Auto dismiss after 4 seconds
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  };

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setState("submitting");

    const form = event.currentTarget;
    const formData = new FormData(form);
    const payload = Object.fromEntries(formData.entries());

    try {
      const response = await fetch("/api/bookings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        const errBody = await response.json().catch(() => ({}));
        console.error("Booking submission error details:", errBody);
        if (errBody.details?.fieldErrors) {
          console.error("Validation Field Errors:", errBody.details.fieldErrors);
        }
        
        let errMsg = "We could not process your request. Please check the entries and try again.";
        if (errBody.details?.fieldErrors) {
          const messages = Object.entries(errBody.details.fieldErrors)
            .map(([field, errors]) => `${field}: ${(errors as string[]).join(", ")}`)
            .join("\n");
          if (messages) {
            errMsg = `Validation errors:\n${messages}`;
          }
        }

        setState("error");
        showToast(errMsg, "error");
        return;
      }

      form.reset();
      setState("success");
      showToast("Your request has been successfully registered! We will contact you soon.", "success");
    } catch (err) {
      setState("error");
      showToast("Server connection error. Please check your internet connection and try again.", "error");
    } finally {
      // Re-enable after submitting
      setTimeout(() => setState("idle"), 1000);
    }
  }

  return (
    <>
      {/* Toast container */}
      <div className="fixed top-6 right-6 z-[10000] w-[400px] max-w-[calc(100vw-48px)] flex flex-col gap-3 pointer-events-none font-sans font-devanagari" role="alert" aria-live="assertive">
        {toasts.map((t) => (
          <div 
            key={t.id} 
            className={`pointer-events-auto bg-white/95 backdrop-blur-md border border-saffron/15 rounded-xl p-4 flex items-start gap-3.5 shadow-lg relative overflow-hidden animate-[toastSlideIn_0.35s_cubic-bezier(0.16,1,0.3,1)_forwards] border-l-5 ${
              t.type === "success" ? "border-l-emerald-500" : "border-l-rose-500"
            }`}
          >
            <div className={`w-6 h-6 rounded-full grid place-items-center shrink-0 ${
              t.type === "success" ? "bg-emerald-50 text-emerald-500" : "bg-rose-50 text-rose-500"
            }`}>
              {t.type === "success" ? (
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5"/></svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
              )}
            </div>
            <div className="flex-grow">
              <div className="font-extrabold text-sm text-[#211818] mb-0.5">{t.type === "success" ? "Success!" : "Error"}</div>
              <div className="text-xs text-[#62554e] leading-relaxed whitespace-pre-line">{t.message}</div>
            </div>
            <button
              suppressHydrationWarning
              type="button"
              className="bg-transparent border-none cursor-pointer text-[#62554e] opacity-50 hover:opacity-100 transition-opacity p-0.5"
              onClick={() => setToasts((prev) => prev.filter((item) => item.id !== t.id))}
              aria-label="Close"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
            </button>
            <div className={`absolute bottom-0 left-0 h-[3px] w-full origin-left animate-[toastCountdown_4s_linear_forwards] ${
              t.type === "success" ? "bg-emerald-500" : "bg-rose-500"
            }`}></div>
          </div>
        ))}
      </div>

      <form className="glass-panel rounded-[2rem] p-6 sm:p-8 shadow-2xl relative overflow-hidden flex flex-col gap-5 font-sans text-white border border-white/10" onSubmit={handleSubmit}>
        {/* Decorative subtle background gradient glows */}
        <div className="absolute top-0 right-0 w-[150px] h-[150px] bg-saffron/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-[150px] h-[150px] bg-gold/5 rounded-full blur-3xl pointer-events-none"></div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 w-full relative z-10">
          {/* Name */}
          <div className="flex flex-col gap-2">
            <label className="text-[13px] font-bold tracking-wide text-white/90" htmlFor="name">Name</label>
            <input 
              suppressHydrationWarning
              id="name" 
              name="name" 
              required 
              placeholder="Enter your name" 
              disabled={state === "submitting"} 
              className="w-full border border-white/15 rounded-xl bg-obsidian/75 text-white text-[15px] py-4 px-4 transition-all duration-300 hover:border-saffron/40 focus:border-saffron focus:bg-obsidian/95 focus:ring-4 focus:ring-saffron/15 outline-none disabled:opacity-50"
            />
          </div>

          {/* Phone */}
          <div className="flex flex-col gap-2">
            <label className="text-[13px] font-bold tracking-wide text-white/90" htmlFor="phone">Phone Number</label>
            <input 
              suppressHydrationWarning
              id="phone" 
              name="phone" 
              required 
              type="tel"
              placeholder="Enter your phone number" 
              disabled={state === "submitting"} 
              className="w-full border border-white/15 rounded-xl bg-obsidian/75 text-white text-[15px] py-4 px-4 transition-all duration-300 hover:border-saffron/40 focus:border-saffron focus:bg-obsidian/95 focus:ring-4 focus:ring-saffron/15 outline-none disabled:opacity-50"
            />
          </div>

          {/* Preferred Date */}
          <div className="flex flex-col gap-2">
            <label className="text-[13px] font-bold tracking-wide text-white/90" htmlFor="preferredDate">Date</label>
            <input 
              suppressHydrationWarning
              id="preferredDate" 
              name="preferredDate" 
              required 
              type="date" 
              disabled={state === "submitting"} 
              className="w-full border border-white/15 rounded-xl bg-obsidian/75 text-[#8a7f77] focus:text-white text-[15px] py-4 px-4 transition-all duration-300 hover:border-saffron/40 focus:border-saffron focus:bg-obsidian/95 focus:ring-4 focus:ring-saffron/15 outline-none disabled:opacity-50 [color-scheme:dark] cursor-pointer"
            />
          </div>

          {/* Pooja Service Dropdown */}
          <div className="flex flex-col gap-2">
            <label className="text-[13px] font-bold tracking-wide text-white/90" htmlFor="serviceId">Service</label>
            <div className="relative flex items-center group w-full">
              <select 
                suppressHydrationWarning
                id="serviceId" 
                name="serviceId" 
                required 
                defaultValue="" 
                disabled={state === "submitting"}
                className="w-full border border-white/15 rounded-xl bg-obsidian/75 text-white text-[15px] py-4 px-4 pr-10 transition-all duration-300 hover:border-saffron/40 focus:border-saffron focus:bg-obsidian/95 focus:ring-4 focus:ring-saffron/15 outline-none disabled:opacity-50 appearance-none cursor-pointer font-devanagari"
              >
                <option value="" disabled className="bg-[#150f0d] text-white/60 font-sans">
                  Select service / katha / consultation...
                </option>
                {services.map((service) => (
                  <option key={service.id} value={service.id} className="bg-[#150f0d] text-white">
                    {service.name}
                  </option>
                ))}
              </select>
              <span className="absolute right-4 text-[#8a7f77] pointer-events-none flex items-center transition-colors duration-200 group-focus-within:text-saffron">
                <svg className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="m6 9 6 6 6-6"/></svg>
              </span>
            </div>
          </div>

          {/* Address / Location */}
          <div className="flex flex-col gap-2 sm:col-span-2">
            <label className="text-[13px] font-bold tracking-wide text-white/90" htmlFor="address">Address</label>
            <textarea 
              suppressHydrationWarning
              id="address" 
              name="address" 
              required 
              placeholder="Enter your complete address" 
              disabled={state === "submitting"} 
              className="w-full border border-white/15 rounded-xl bg-obsidian/75 text-white text-[15px] py-4 px-4 min-h-[110px] resize-y transition-all duration-300 hover:border-saffron/40 focus:border-saffron focus:bg-obsidian/95 focus:ring-4 focus:ring-saffron/15 outline-none disabled:opacity-50"
            />
          </div>
        </div>

        <button 
          suppressHydrationWarning
          className="w-full h-[58px] bg-gradient-to-r from-saffron to-vermilion hover:from-saffron-hover hover:to-vermilion text-white text-base font-bold tracking-wide rounded-xl shadow-[0_8px_24px_rgba(224,83,32,0.25)] mt-2 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_12px_30px_rgba(224,83,32,0.5)] active:translate-y-0 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2.5 cursor-pointer text-lg font-sans uppercase tracking-wider" 
          disabled={state === "submitting"} 
          type="submit"
        >
          {state === "submitting" ? (
            <>
              <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Sending Request...
            </>
          ) : (
            <>
              <span>Send Request</span>
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
            </>
          )}
        </button>

        {/* Divider */}
        <div className="border-t border-white/10 my-1"></div>

        {/* Highlights Row */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-1 text-[11px] sm:text-xs text-white/70 font-devanagari font-bold w-full text-center md:text-left">
          <div className="cursor-default hover:text-white transition-colors duration-200">
            <span>विश्वसनीय और अनुभवी आचार्य</span>
          </div>
          <div className="hidden md:block opacity-25 font-sans">•</div>
          <div className="cursor-default hover:text-white transition-colors duration-200">
            <span>विधि-विधान से संपन्न अनुष्ठान</span>
          </div>
          <div className="hidden md:block opacity-25 font-sans">•</div>
          <div className="cursor-default hover:text-white transition-colors duration-200">
            <span>आपकी संतुष्टि हमारी प्राथमिकता</span>
          </div>
        </div>
      </form>
    </>
  );
}
