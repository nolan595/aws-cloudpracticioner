"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronDown, ChevronUp } from "lucide-react";
import { EXAM_META, DOMAINS, WELL_ARCHITECTED_PILLARS, SUPPORT_PLANS } from "@/data/exam";

const DOMAIN_COLORS: Record<number, { ring: string; bar: string; text: string; bg: string }> = {
  1: { ring: "ring-blue-500/30", bar: "bg-blue-500", text: "text-blue-300", bg: "bg-blue-500/10" },
  2: { ring: "ring-red-500/30", bar: "bg-red-500", text: "text-red-300", bg: "bg-red-500/10" },
  3: { ring: "ring-emerald-500/30", bar: "bg-emerald-500", text: "text-emerald-300", bg: "bg-emerald-500/10" },
  4: { ring: "ring-amber-500/30", bar: "bg-amber-500", text: "text-amber-300", bg: "bg-amber-500/10" },
};

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  const [open, setOpen] = useState(true);
  return (
    <div className="bg-zinc-900 border border-white/8 rounded-2xl overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full text-left px-5 py-4 flex items-center justify-between"
      >
        <h2 className="text-sm font-semibold text-white">{title}</h2>
        {open ? <ChevronUp className="w-4 h-4 text-zinc-500" /> : <ChevronDown className="w-4 h-4 text-zinc-500" />}
      </button>
      {open && <div className="px-5 pb-5 border-t border-white/5 pt-4">{children}</div>}
    </div>
  );
}

export default function ExamGuidePage() {
  return (
    <div className="min-h-screen bg-[#09090e]">
      <header className="border-b border-white/8 bg-[#09090e]/95 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-5 h-14 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 text-zinc-400 hover:text-white transition-colors text-sm">
            <ChevronLeft className="w-4 h-4" />
            Dashboard
          </Link>
          <span className="text-sm font-medium text-white">Exam Guide</span>
          <span className="text-xs text-zinc-500 bg-zinc-900 border border-white/8 px-2.5 py-1 rounded-full">{EXAM_META.code}</span>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-5 py-6 space-y-5">
        {/* Exam at a glance */}
        <Section title="Exam at a Glance">
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {[
              { label: "Exam code", value: EXAM_META.code },
              { label: "Level", value: EXAM_META.level },
              { label: "Duration", value: `${EXAM_META.duration} minutes` },
              { label: "Scored questions", value: `${EXAM_META.scoredQuestions}` },
              { label: "Total questions", value: `${EXAM_META.totalQuestions} (15 unscored)` },
              { label: "Passing score", value: `${EXAM_META.passingScore}/1000` },
              { label: "Cost", value: `$${EXAM_META.cost} USD` },
              { label: "Valid for", value: `${EXAM_META.validFor} years` },
              { label: "Delivered by", value: "Pearson VUE" },
            ].map((item) => (
              <div key={item.label} className="bg-zinc-800/60 rounded-xl p-3.5">
                <div className="text-xs text-zinc-500 mb-0.5">{item.label}</div>
                <div className="text-sm font-semibold text-white">{item.value}</div>
              </div>
            ))}
          </div>
          <div className="mt-4 bg-zinc-800/40 rounded-xl p-4 space-y-2">
            <p className="text-xs font-medium text-zinc-400 uppercase tracking-wider">Question types</p>
            {EXAM_META.format.map((f) => (
              <p key={f} className="text-sm text-zinc-300">• {f}</p>
            ))}
            <p className="text-xs text-zinc-500 mt-2">
              Unanswered questions are scored as incorrect — no penalty for guessing. Always select an answer.
            </p>
          </div>
        </Section>

        {/* Domain weights */}
        <Section title="Exam Domains & Weights">
          <div className="space-y-6">
            {DOMAINS.map((domain) => {
              const c = DOMAIN_COLORS[domain.id];
              return (
                <div key={domain.id}>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className={`text-sm font-bold ${c.text}`}>Domain {domain.id}</span>
                      <span className="text-sm font-semibold text-white">{domain.name}</span>
                    </div>
                    <span className={`text-xs font-bold ${c.text} ${c.bg} px-2.5 py-1 rounded-full`}>{domain.weight}%</span>
                  </div>
                  <div className="h-2 bg-zinc-800 rounded-full overflow-hidden mb-3">
                    <div className={`h-full ${c.bar} rounded-full`} style={{ width: `${domain.weight}%` }} />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-2">
                    <div>
                      <p className="text-xs text-zinc-500 uppercase tracking-wider mb-1.5">Task Statements</p>
                      {domain.taskStatements.map((ts, i) => (
                        <p key={i} className="text-xs text-zinc-400 mb-1">• {ts}</p>
                      ))}
                    </div>
                    <div>
                      <p className="text-xs text-zinc-500 uppercase tracking-wider mb-1.5">Key Topics</p>
                      {domain.keyTopics.map((kt, i) => (
                        <p key={i} className="text-xs text-zinc-400 mb-1">• {kt}</p>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </Section>

        {/* Well-Architected Framework */}
        <Section title="AWS Well-Architected Framework — 6 Pillars">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {WELL_ARCHITECTED_PILLARS.map((pillar, i) => (
              <div key={i} className="bg-zinc-800/50 border border-white/5 rounded-xl p-4">
                <h3 className="text-sm font-semibold text-white mb-1">{pillar.name}</h3>
                <p className="text-xs text-zinc-500 mb-3 leading-relaxed">{pillar.description}</p>
                <div className="space-y-1">
                  {pillar.principles.map((p, j) => (
                    <p key={j} className="text-xs text-zinc-400">• {p}</p>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Section>

        {/* Support Plans */}
        <Section title="AWS Support Plans">
          <div className="overflow-x-auto -mx-1">
            <div className="flex gap-3 min-w-max pb-1">
              {SUPPORT_PLANS.map((plan) => (
                <div key={plan.name} className={`bg-zinc-800/60 border rounded-xl p-4 w-52 flex-shrink-0 ${plan.name === "Enterprise" ? "border-indigo-500/30" : "border-white/5"}`}>
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="text-sm font-bold text-white">{plan.name}</h3>
                    {plan.name === "Enterprise" && <span className="text-xs bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 px-1.5 py-0.5 rounded-full">TAM</span>}
                  </div>
                  <p className="text-xs text-zinc-500 mb-3">{plan.price}</p>
                  {plan.responseTime !== "N/A" && (
                    <p className="text-xs text-emerald-400 mb-3 font-medium">{plan.responseTime}</p>
                  )}
                  <div className="space-y-1.5">
                    {plan.features.map((f, i) => (
                      <p key={i} className="text-xs text-zinc-400 leading-relaxed">• {f}</p>
                    ))}
                  </div>
                  {plan.channels.length > 0 && (
                    <div className="mt-3 flex flex-wrap gap-1">
                      {plan.channels.map((c) => (
                        <span key={c} className="text-xs bg-zinc-700 text-zinc-300 px-2 py-0.5 rounded-full">{c}</span>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </Section>

        {/* Shared Responsibility Model */}
        <Section title="Shared Responsibility Model">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-blue-500/5 border border-blue-500/20 rounded-xl p-4">
              <h3 className="text-sm font-semibold text-blue-300 mb-3">AWS is responsible for security <em>OF</em> the cloud</h3>
              <div className="space-y-1.5 text-xs text-zinc-400">
                {["Physical data center security", "Networking hardware & infrastructure", "Hypervisor and virtualization layer", "Managed service software (e.g., RDS engine patching)", "Global edge network", "Hardware lifecycle and replacement"].map((item) => (
                  <p key={item}>• {item}</p>
                ))}
              </div>
            </div>
            <div className="bg-emerald-500/5 border border-emerald-500/20 rounded-xl p-4">
              <h3 className="text-sm font-semibold text-emerald-300 mb-3">Customer is responsible for security <em>IN</em> the cloud</h3>
              <div className="space-y-1.5 text-xs text-zinc-400">
                {["Guest OS (patches, updates) on EC2", "Security groups and NACLs configuration", "IAM users, roles, and policies", "Application-level security", "Encryption of data at rest and in transit", "Customer data and access management"].map((item) => (
                  <p key={item}>• {item}</p>
                ))}
              </div>
            </div>
          </div>
          <div className="mt-4 bg-zinc-800/40 rounded-xl p-4 text-xs text-zinc-400 space-y-1">
            <p className="text-zinc-300 font-medium mb-2">Key rule of thumb for the exam:</p>
            <p>• EC2: Customer manages OS and above (patches, security groups, app, data)</p>
            <p>• RDS: AWS manages DB engine patching; customer manages DB users, schemas, data, encryption setting</p>
            <p>• Lambda/S3/DynamoDB: More AWS responsibility; customer manages IAM, data, configuration</p>
          </div>
        </Section>

        {/* Cloud economics */}
        <Section title="6 Advantages of Cloud Computing">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[
              { n: "1", title: "Trade CapEx for OpEx", desc: "Pay on-demand; no upfront hardware investment. Reduced TCO." },
              { n: "2", title: "Massive economies of scale", desc: "AWS aggregates usage from thousands of customers → lower prices." },
              { n: "3", title: "Stop guessing capacity", desc: "Scale instantly to actual demand — no over/under-provisioning." },
              { n: "4", title: "Increase speed & agility", desc: "New resources in minutes vs weeks; faster time to market." },
              { n: "5", title: "Stop maintaining data centers", desc: "Focus on your product, not on racking, stacking, and powering servers." },
              { n: "6", title: "Go global in minutes", desc: "Deploy to multiple AWS regions worldwide with just a few clicks." },
            ].map((item) => (
              <div key={item.n} className="flex items-start gap-3 bg-zinc-800/40 rounded-xl p-3.5">
                <span className="w-6 h-6 rounded-full bg-indigo-500/20 text-indigo-300 text-xs font-bold flex items-center justify-center flex-shrink-0">{item.n}</span>
                <div>
                  <p className="text-sm font-medium text-white mb-0.5">{item.title}</p>
                  <p className="text-xs text-zinc-500 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </Section>

        {/* 5 Characteristics */}
        <Section title="5 Characteristics of Cloud Computing (NIST)">
          <div className="space-y-3">
            {[
              { name: "On-demand self-service", desc: "Users provision resources without human interaction from the provider." },
              { name: "Broad network access", desc: "Resources available over the network and accessed by diverse client platforms." },
              { name: "Resource pooling (multi-tenancy)", desc: "Multiple customers share the same physical infrastructure with isolation." },
              { name: "Rapid elasticity", desc: "Automatically and quickly acquire and dispose resources when needed." },
              { name: "Measured service", desc: "Usage is measured; users pay correctly for what they've used." },
            ].map((item) => (
              <div key={item.name} className="flex items-start gap-3 bg-zinc-800/40 rounded-xl p-3.5">
                <div className="w-1.5 h-1.5 rounded-full bg-indigo-400 flex-shrink-0 mt-1.5" />
                <div>
                  <p className="text-sm font-medium text-white mb-0.5">{item.name}</p>
                  <p className="text-xs text-zinc-500 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </Section>

        {/* Cloud CAF */}
        <Section title="AWS Cloud Adoption Framework (CAF) — 6 Perspectives">
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {[
              { name: "Business", desc: "Ensures IT aligns with business needs. Business case for cloud adoption." },
              { name: "People", desc: "Ensures organization has skills, resources, and culture for cloud adoption." },
              { name: "Governance", desc: "Policies, controls, and processes to ensure compliance and cost optimization." },
              { name: "Platform", desc: "Principles and patterns for implementing new solutions and migrating workloads." },
              { name: "Security", desc: "Meet security objectives for visibility, auditability, control, and agility." },
              { name: "Operations", desc: "Enable, run, use, operate, and recover IT workloads to agreed business levels." },
            ].map((p) => (
              <div key={p.name} className="bg-zinc-800/50 border border-white/5 rounded-xl p-3.5">
                <p className="text-sm font-semibold text-white mb-1">{p.name}</p>
                <p className="text-xs text-zinc-500 leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>
        </Section>

        {/* Pricing models */}
        <Section title="EC2 Pricing Models">
          <div className="space-y-3">
            {[
              { name: "On-Demand", color: "text-zinc-300", desc: "Pay per hour/second. No commitment. Best for unpredictable workloads or development/testing." },
              { name: "Reserved Instances", color: "text-blue-300", desc: "1 or 3-year commitment. Up to 72% savings. Best for steady-state, predictable workloads. Standard vs Convertible vs Scheduled." },
              { name: "Spot Instances", color: "text-purple-300", desc: "Up to 90% savings. AWS can reclaim with 2-min warning. Best for fault-tolerant batch jobs, ML training, big data." },
              { name: "Dedicated Hosts", color: "text-emerald-300", desc: "Physical EC2 server fully dedicated to you. Most expensive. Used for compliance requirements or bring-your-own-license (BYOL)." },
              { name: "Dedicated Instances", color: "text-amber-300", desc: "Instances on hardware dedicated to your account. Between Dedicated Hosts and standard instances." },
              { name: "Savings Plans", color: "text-red-300", desc: "Flexible pricing model. Commit to $X/hour spend for 1 or 3 years. Applies to EC2, Fargate, Lambda. Up to 66-72% savings." },
            ].map((item) => (
              <div key={item.name} className="flex items-start gap-3 bg-zinc-800/40 rounded-xl p-3.5">
                <div className="w-1.5 h-1.5 rounded-full bg-indigo-400 flex-shrink-0 mt-1.5" />
                <div>
                  <p className={`text-sm font-semibold mb-0.5 ${item.color}`}>{item.name}</p>
                  <p className="text-xs text-zinc-500 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </Section>

        {/* AWS Global Infrastructure */}
        <Section title="AWS Global Infrastructure">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { name: "Regions", count: "33+", desc: "A geographic area. Each Region has 2-6 AZs. Choose based on: compliance, latency, service availability, pricing.", tip: "Regions are isolated — data doesn't leave unless you explicitly replicate it." },
              { name: "Availability Zones", count: "105+", desc: "One or more discrete data centers with redundant power, networking in separate facilities. AZs in a Region are connected with low-latency links.", tip: "Deploy across multiple AZs for high availability." },
              { name: "Edge Locations / PoPs", count: "400+", desc: "Used by CloudFront (CDN) and Route 53 for caching and DNS resolution close to end users. More than Regions and AZs combined.", tip: "Edge Locations ≠ AZs. They are separate caching points for CloudFront/Route 53." },
            ].map((item) => (
              <div key={item.name} className="bg-zinc-800/50 border border-white/5 rounded-xl p-4">
                <div className="flex items-baseline gap-2 mb-2">
                  <span className="text-2xl font-black text-white">{item.count}</span>
                  <span className="text-sm font-semibold text-zinc-300">{item.name}</span>
                </div>
                <p className="text-xs text-zinc-500 leading-relaxed mb-2">{item.desc}</p>
                <p className="text-xs text-indigo-300/80 bg-indigo-500/5 border border-indigo-500/15 rounded-lg px-2.5 py-2 leading-relaxed">{item.tip}</p>
              </div>
            ))}
          </div>
        </Section>
      </div>
    </div>
  );
}
