import type { Domain } from "@/data/questions";
import { DOMAIN_NAMES, DOMAIN_WEIGHTS } from "@/data/questions";

interface Props {
  domain: Domain;
  showWeight?: boolean;
  size?: "sm" | "md";
}

const COLORS: Record<Domain, { bg: string; text: string; border: string; dot: string }> = {
  1: { bg: "bg-blue-500/10", text: "text-blue-300", border: "border-blue-500/25", dot: "bg-blue-400" },
  2: { bg: "bg-red-500/10", text: "text-red-300", border: "border-red-500/25", dot: "bg-red-400" },
  3: { bg: "bg-emerald-500/10", text: "text-emerald-300", border: "border-emerald-500/25", dot: "bg-emerald-400" },
  4: { bg: "bg-amber-500/10", text: "text-amber-300", border: "border-amber-500/25", dot: "bg-amber-400" },
};

export default function DomainBadge({ domain, showWeight = false, size = "sm" }: Props) {
  const c = COLORS[domain];
  const padding = size === "sm" ? "px-2.5 py-1" : "px-3 py-1.5";
  const textSize = size === "sm" ? "text-xs" : "text-sm";

  return (
    <span className={`inline-flex items-center gap-1.5 ${padding} rounded-full border ${c.bg} ${c.text} ${c.border} ${textSize} font-medium`}>
      <span className={`w-1.5 h-1.5 rounded-full ${c.dot} flex-shrink-0`} />
      {DOMAIN_NAMES[domain]}
      {showWeight && <span className="opacity-60">({DOMAIN_WEIGHTS[domain]}%)</span>}
    </span>
  );
}
