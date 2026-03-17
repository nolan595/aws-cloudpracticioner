"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { ChevronLeft, Search, ChevronDown, ChevronUp, Lightbulb, Layers } from "lucide-react";
import { services, categories } from "@/data/services";
import type { AWSService } from "@/data/services";

const DOMAIN_COLORS: Record<number, string> = {
  1: "text-blue-300 bg-blue-500/10 border-blue-500/20",
  2: "text-red-300 bg-red-500/10 border-red-500/20",
  3: "text-emerald-300 bg-emerald-500/10 border-emerald-500/20",
  4: "text-amber-300 bg-amber-500/10 border-amber-500/20",
};
const DOMAIN_LABELS: Record<number, string> = {
  1: "D1: Cloud Concepts",
  2: "D2: Security",
  3: "D3: Technology",
  4: "D4: Billing",
};

function ServiceCard({ service }: { service: AWSService }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="bg-zinc-900 border border-white/8 rounded-xl overflow-hidden hover:border-white/15 transition-colors">
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full text-left px-4 py-4 flex items-start justify-between gap-3"
      >
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap mb-1">
            <span className="text-sm font-semibold text-white">{service.name}</span>
            <span className={`text-xs px-2 py-0.5 rounded-full border ${DOMAIN_COLORS[service.domain]}`}>
              {DOMAIN_LABELS[service.domain]}
            </span>
            <span className="text-xs text-zinc-600 bg-zinc-800 px-2 py-0.5 rounded-full">{service.category}</span>
          </div>
          <p className="text-xs text-zinc-400 leading-relaxed">{service.summary}</p>
        </div>
        {expanded ? (
          <ChevronUp className="w-4 h-4 text-zinc-500 flex-shrink-0 mt-0.5" />
        ) : (
          <ChevronDown className="w-4 h-4 text-zinc-500 flex-shrink-0 mt-0.5" />
        )}
      </button>

      {expanded && (
        <div className="px-4 pb-4 border-t border-white/5 pt-3 space-y-3">
          <div>
            <p className="text-xs font-medium text-zinc-500 uppercase tracking-wider mb-2">Key Facts</p>
            <ul className="space-y-1.5">
              {service.keyFacts.map((fact, i) => (
                <li key={i} className="flex items-start gap-2 text-xs text-zinc-300 leading-relaxed">
                  <span className="text-indigo-400 mt-0.5 flex-shrink-0">•</span>
                  {fact}
                </li>
              ))}
            </ul>
          </div>
          {service.examTip && (
            <div className="flex items-start gap-2.5 bg-amber-500/5 border border-amber-500/15 rounded-xl p-3">
              <Lightbulb className="w-3.5 h-3.5 text-amber-400 flex-shrink-0 mt-0.5" />
              <p className="text-xs text-amber-200/80 leading-relaxed">{service.examTip}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default function ServicesPage() {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [selectedDomain, setSelectedDomain] = useState<number | null>(null);
  const [expandAll, setExpandAll] = useState(false);

  const allCategories = ["All", ...categories];

  const filtered = useMemo(() => {
    return services.filter((s) => {
      const matchesSearch =
        !search ||
        s.name.toLowerCase().includes(search.toLowerCase()) ||
        s.summary.toLowerCase().includes(search.toLowerCase()) ||
        s.keyFacts.some((f) => f.toLowerCase().includes(search.toLowerCase()));
      const matchesCategory = selectedCategory === "All" || s.category === selectedCategory;
      const matchesDomain = !selectedDomain || s.domain === selectedDomain;
      return matchesSearch && matchesCategory && matchesDomain;
    });
  }, [search, selectedCategory, selectedDomain]);

  return (
    <div className="min-h-screen bg-[#09090e]">
      <header className="border-b border-white/8 bg-[#09090e]/95 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-5 h-14 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 text-zinc-400 hover:text-white transition-colors text-sm">
            <ChevronLeft className="w-4 h-4" />
            Dashboard
          </Link>
          <span className="text-sm font-medium text-white">Service Reference</span>
          <span className="text-xs text-zinc-500">{filtered.length}/{services.length} services</span>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-5 py-6 space-y-5">
        {/* Search + filters */}
        <div className="space-y-3">
          <div className="relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
            <input
              type="text"
              placeholder="Search services, categories, use cases..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-zinc-900 border border-white/10 rounded-xl pl-10 pr-4 py-3 text-sm text-white placeholder:text-zinc-600 focus:outline-none focus:border-indigo-500/50 transition-colors"
            />
          </div>

          {/* Category filter */}
          <div className="flex flex-wrap gap-2">
            {allCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`text-xs px-3 py-1.5 rounded-full border transition-colors ${selectedCategory === cat ? "bg-indigo-500/20 text-indigo-300 border-indigo-400" : "bg-zinc-900 text-zinc-500 border-white/10 hover:border-white/25"}`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Domain filter */}
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedDomain(null)}
              className={`text-xs px-3 py-1.5 rounded-full border transition-colors ${!selectedDomain ? "bg-zinc-700 text-zinc-200 border-white/20" : "bg-zinc-900 text-zinc-500 border-white/10 hover:border-white/25"}`}
            >
              All Domains
            </button>
            {[1, 2, 3, 4].map((d) => (
              <button
                key={d}
                onClick={() => setSelectedDomain(selectedDomain === d ? null : d)}
                className={`text-xs px-3 py-1.5 rounded-full border transition-colors ${selectedDomain === d ? `${DOMAIN_COLORS[d]}` : "bg-zinc-900 text-zinc-500 border-white/10 hover:border-white/25"}`}
              >
                {DOMAIN_LABELS[d]}
              </button>
            ))}
          </div>
        </div>

        {/* Results */}
        {filtered.length === 0 ? (
          <div className="text-center py-16 text-zinc-500 text-sm">No services match your filters.</div>
        ) : (
          <div className="space-y-2">
            {filtered.map((s) => (
              <ServiceCard key={s.name} service={s} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
