import type { PoojaService } from "@/types/pooja";
import { User, BookOpen, Flower2, Mail, ShieldCheck } from "lucide-react";

type PoojaCardProps = {
  pooja: PoojaService;
  index: number;
};

export function PoojaCard({ pooja, index }: PoojaCardProps) {
  const isFeatured = pooja.id === "shrimad-bhagwat-katha";

  // Format duration
  const formatDuration = (mins: number) => {
    if (mins >= 420) return "7 Days";
    if (mins >= 60) return `${Math.floor(mins / 60)} Hours`;
    return `${mins} Mins`;
  };

  const btnText = pooja.name.toLowerCase().includes("katha") ? "Book Katha →" : "Book Ritual →";

  // Style variables based on featured vs regular
  const cardBg = isFeatured
    ? "bg-gradient-to-br from-[#5c1318] via-[#480c10] to-[#2b0507] text-white border border-[#C89B3C]/40 shadow-[0_20px_50px_rgba(200,155,60,0.12)]"
    : "bg-white/95 backdrop-blur-md border border-[#F1E7DD] text-template-dark shadow-[0_12px_40px_rgba(109,27,27,0.03)] hover:shadow-[0_20px_50px_rgba(109,27,27,0.08)]";

  const titleColor = isFeatured ? "text-white" : "text-[#6D1B1B]";
  const descColor = isFeatured ? "text-white/70" : "text-fg-muted";
  const dividerColor = isFeatured ? "border-white/10" : "border-template-sand/50";
  const dakshinaLabelColor = isFeatured ? "text-white/50" : "text-fg-muted";
  const priceColor = isFeatured ? "text-[#D97706]" : "text-[#6D1B1B]";
  
  // Maroon to Saffron gradient button with hover glow
  const buttonBg = "bg-gradient-to-r from-[#6D1B1B] to-[#D97706] hover:from-[#D97706] hover:to-[#6D1B1B] shadow-[0_4px_12px_rgba(109,27,27,0.15)] hover:shadow-[0_8px_25px_rgba(217,119,6,0.35)] text-white";

  return (
    <article
      className={`relative rounded-[28px] overflow-hidden flex flex-col transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-2 group font-sans p-7 sm:p-8 h-full ${cardBg}`}
    >
      {/* Most Popular Badge for Featured Card */}
      {isFeatured && (
        <span className="absolute top-4 right-4 z-20 bg-gradient-to-r from-[#C89B3C] via-[#e5c158] to-[#C89B3C] text-white text-[9px] font-black uppercase tracking-[0.15em] px-3.5 py-1.5 rounded-full shadow-[0_4px_10px_rgba(200,155,60,0.3)] border border-[#e5c158]/50 animate-pulse">
          ⭐ Most Popular
        </span>
      )}

      {/* Large Top Image - 10-15% smaller height (h-[160px]) with 22px border radius */}
      <div className="relative w-full h-[160px] overflow-hidden rounded-[22px] mb-4 bg-black/5 shrink-0">
        <img
          src={pooja.image || "/download.jpeg"}
          alt={pooja.name}
          className="w-full h-full object-cover transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
        />
        {/* Subtle vignette on image */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
      </div>

      {/* Card Body content with mt-between to support equal card height */}
      <div className="flex flex-col flex-grow">

        {/* Service Title - mb-3 (title -> description) */}
        <h3 className={`text-lg sm:text-[19px] font-black mb-3 tracking-tight leading-snug font-devanagari ${titleColor}`}>
          {pooja.name}
        </h3>

        {/* Service Description (limited to 3 lines) - mb-4.5 (18px) (description -> features) */}
        <p className={`text-[12.5px] leading-relaxed mb-[18px] line-clamp-3 ${descColor}`}>
          {pooja.description}
        </p>

        {/* Features checkmarks - mb-4 (features -> price) */}
        <div className="flex flex-col gap-2 mb-4">
          {pooja.features?.map((feat, i) => (
            <div key={i} className="flex items-center gap-2 text-xs font-bold">
              <span className="text-emerald-500 font-sans">✓</span>
              <span className={isFeatured ? "text-white/80" : "text-template-dark/85"}>{feat}</span>
            </div>
          ))}
        </div>

        {/* Bottom aligned pricing and CTA */}
        <div className="mt-auto flex flex-col w-full">
          {/* Divider */}
          <div className={`w-full border-t mb-4 ${dividerColor}`}></div>

          {/* Starting Dakshina */}
          <div className="flex flex-col">
            <span className={`text-[9px] font-black tracking-widest uppercase ${dakshinaLabelColor}`}>
              Starting Dakshina
            </span>
            <span className={`text-2xl font-black leading-none mt-1 font-sans ${priceColor}`}>
              ₹{pooja.startingPrice.toLocaleString("en-IN")}
            </span>
          </div>

          {/* Full Width Button - mt-3 (price -> button) & rounded-2xl (16px) */}
          <a
            href="#contact"
            className={`w-full py-4 mt-3 rounded-2xl text-center text-xs font-extrabold uppercase tracking-widest transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer ${buttonBg}`}
          >
            {btnText}
          </a>
        </div>
      </div>
    </article>
  );
}
