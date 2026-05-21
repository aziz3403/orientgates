"use client";

import { useEffect, useState, useCallback } from "react";
import Link from "next/link";

interface Inquiry {
  id: string;
  created_at: string;
  name: string;
  email: string;
  phone?: string | null;
  country?: string | null;
  inquiry_type?: string | null;
  budget_range?: string | null;
  collector_type?: string | null;
  preferred_contact?: string | null;
  timeline?: string | null;
  piece_name?: string | null;
  message: string;
  source: string;
  user_agent?: string | null;
  ip?: string | null;
  handled: boolean;
  handled_at?: string | null;
  notes?: string | null;
}

function relativeTime(iso: string): string {
  const t = new Date(iso).getTime();
  const diff = Date.now() - t;
  const m = Math.floor(diff / 60000);
  if (m < 1) return "just now";
  if (m < 60) return `${m}m ago`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h}h ago`;
  const d = Math.floor(h / 24);
  if (d < 30) return `${d}d ago`;
  return new Date(iso).toLocaleDateString();
}

export default function InquiriesInboxPage() {
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [showHandled, setShowHandled] = useState(false);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [savingId, setSavingId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const fetchInquiries = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(
        `/api/admin/inquiries${showHandled ? "?handled=true" : ""}`,
        { cache: "no-store" }
      );
      const data = await res.json();
      if (!data.ok) throw new Error(data.error || "Failed to load");
      setInquiries(data.inquiries as Inquiry[]);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to load");
    } finally {
      setLoading(false);
    }
  }, [showHandled]);

  useEffect(() => {
    fetchInquiries();
  }, [fetchInquiries]);

  const setHandled = async (id: string, handled: boolean) => {
    setSavingId(id);
    try {
      const res = await fetch("/api/admin/inquiries", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, handled }),
      });
      const data = await res.json();
      if (!data.ok) throw new Error(data.error || "Failed to update");
      setInquiries((prev) => prev.filter((i) => (showHandled ? !handled : handled) ? i.id !== id : true)
                                  .map((i) => i.id === id ? { ...i, handled, handled_at: handled ? new Date().toISOString() : null } : i));
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to update");
    } finally {
      setSavingId(null);
    }
  };

  const remove = async (id: string) => {
    if (!confirm("Delete this inquiry permanently?")) return;
    setSavingId(id);
    try {
      const res = await fetch(`/api/admin/inquiries?id=${encodeURIComponent(id)}`, { method: "DELETE" });
      const data = await res.json();
      if (!data.ok) throw new Error(data.error || "Failed to delete");
      setInquiries((prev) => prev.filter((i) => i.id !== id));
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to delete");
    } finally {
      setSavingId(null);
    }
  };

  return (
    <div className="min-h-screen bg-midnight pt-28 pb-20 px-6">
      <div className="max-w-[1200px] mx-auto">
        {error && (
          <div className="fixed top-6 right-6 z-50 bg-red-500/10 border border-red-500/40 text-red-300 px-5 py-3 text-[11px] tracking-[0.15em] uppercase font-sans max-w-md">
            {error}
          </div>
        )}

        {/* Header */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-8">
          <div>
            <div className="flex items-center gap-3 mb-2 text-[10px] tracking-[0.3em] uppercase text-warm-gray/60 font-sans">
              <Link href="/admin" className="hover:text-brass transition-colors">Products</Link>
              <span className="text-white/10">/</span>
              <span>Inquiries</span>
            </div>
            <h1 className="text-2xl font-serif text-ivory">Inquiries Inbox</h1>
            <p className="text-[12px] text-warm-gray/70 font-sans mt-1">
              {loading
                ? "Loading…"
                : `${inquiries.length} ${showHandled ? "handled" : "open"} inquir${inquiries.length === 1 ? "y" : "ies"}`}
            </p>
          </div>
          <div className="flex gap-3 flex-wrap">
            <div className="flex border border-white/15">
              <button
                onClick={() => setShowHandled(false)}
                className={`px-4 py-2 text-[10px] tracking-[0.2em] uppercase font-sans transition-colors ${
                  !showHandled ? "bg-brass text-midnight" : "text-warm-gray/70 hover:text-ivory"
                }`}
              >
                Open
              </button>
              <button
                onClick={() => setShowHandled(true)}
                className={`px-4 py-2 text-[10px] tracking-[0.2em] uppercase font-sans transition-colors ${
                  showHandled ? "bg-brass text-midnight" : "text-warm-gray/70 hover:text-ivory"
                }`}
              >
                Handled
              </button>
            </div>
            <button
              onClick={fetchInquiries}
              disabled={loading}
              className="border border-white/15 text-ivory/60 px-5 py-2 text-[10px] tracking-[0.2em] uppercase font-sans hover:border-brass/30 disabled:opacity-30"
            >
              {loading ? "…" : "Refresh"}
            </button>
          </div>
        </div>

        {/* Empty state */}
        {!loading && inquiries.length === 0 && (
          <div className="border border-white/10 p-16 text-center">
            <p className="text-warm-gray/60 text-sm font-sans">
              {showHandled
                ? "No handled inquiries yet."
                : "No open inquiries. When someone fills out the contact form, it'll appear here."}
            </p>
          </div>
        )}

        {/* List */}
        <div className="space-y-3">
          {inquiries.map((inq) => {
            const expanded = expandedId === inq.id;
            return (
              <div
                key={inq.id}
                className={`border transition-colors ${
                  inq.handled ? "border-white/[0.06] bg-charcoal/30" : "border-white/[0.08] hover:border-brass/20"
                }`}
              >
                {/* Header row */}
                <button
                  onClick={() => setExpandedId(expanded ? null : inq.id)}
                  className="w-full text-left p-4 flex items-center gap-4 hover:bg-white/[0.02] transition-colors"
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-baseline gap-3 flex-wrap">
                      <span className="text-[14px] text-ivory font-sans font-medium">{inq.name}</span>
                      <span className="text-[12px] text-warm-gray/70 font-mono">{inq.email}</span>
                      {inq.inquiry_type && (
                        <span className="text-[9px] tracking-[0.2em] uppercase text-brass/70 font-sans">
                          {inq.inquiry_type}
                        </span>
                      )}
                    </div>
                    <p className="text-[12px] text-warm-gray/70 font-sans mt-1 truncate">{inq.message}</p>
                  </div>
                  <div className="text-[10px] text-warm-gray/50 font-sans whitespace-nowrap">
                    {relativeTime(inq.created_at)}
                  </div>
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 12 12"
                    fill="none"
                    className={`text-warm-gray/40 transition-transform ${expanded ? "rotate-180" : ""}`}
                  >
                    <path d="M3 4.5l3 3 3-3" stroke="currentColor" strokeWidth="1" />
                  </svg>
                </button>

                {/* Expanded */}
                {expanded && (
                  <div className="border-t border-white/[0.05] p-4 space-y-4">
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-[11px] font-sans">
                      {[
                        ["Email", <a key="e" href={`mailto:${inq.email}`} className="text-brass hover:underline break-all">{inq.email}</a>],
                        ["Phone", inq.phone ? <a key="p" href={`tel:${inq.phone}`} className="text-brass hover:underline">{inq.phone}</a> : null],
                        ["Country", inq.country],
                        ["Budget", inq.budget_range],
                        ["Collector type", inq.collector_type],
                        ["Preferred contact", inq.preferred_contact],
                        ["Timeline", inq.timeline],
                        ["Piece", inq.piece_name],
                        ["Source", inq.source],
                      ].filter(([, v]) => v).map(([label, value]) => (
                        <div key={label as string}>
                          <p className="text-[9px] tracking-[0.25em] uppercase text-warm-gray/50 mb-1">{label as string}</p>
                          <p className="text-ivory/80">{value}</p>
                        </div>
                      ))}
                    </div>
                    <div>
                      <p className="text-[9px] tracking-[0.25em] uppercase text-warm-gray/50 mb-2">Message</p>
                      <div className="bg-charcoal border-l-2 border-brass/40 p-4 text-[13px] text-ivory/85 leading-relaxed font-sans whitespace-pre-wrap">
                        {inq.message}
                      </div>
                    </div>
                    <div className="flex gap-3 pt-2">
                      <a
                        href={`mailto:${inq.email}?subject=Re%3A%20Your%20inquiry%20at%20The%20Orient%20Gates&body=Dear%20${encodeURIComponent(inq.name.split(' ')[0] || inq.name)}%2C%0A%0A`}
                        className="bg-brass text-midnight px-5 py-2 text-[10px] tracking-[0.2em] uppercase font-sans inline-flex items-center gap-2"
                      >
                        Reply via Email
                      </a>
                      {inq.phone && (
                        <a
                          href={`https://wa.me/${inq.phone.replace(/[^\d]/g, "")}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="border border-emerald-500/30 text-emerald-300 px-5 py-2 text-[10px] tracking-[0.2em] uppercase font-sans inline-flex items-center gap-2 hover:border-emerald-500"
                        >
                          WhatsApp
                        </a>
                      )}
                      <button
                        onClick={() => setHandled(inq.id, !inq.handled)}
                        disabled={savingId === inq.id}
                        className="border border-white/15 text-ivory/70 px-5 py-2 text-[10px] tracking-[0.2em] uppercase font-sans hover:border-brass/30 disabled:opacity-30"
                      >
                        {savingId === inq.id ? "…" : inq.handled ? "Mark Open" : "Mark Handled"}
                      </button>
                      <button
                        onClick={() => remove(inq.id)}
                        disabled={savingId === inq.id}
                        className="text-[10px] tracking-[0.2em] uppercase text-red-400/60 hover:text-red-400 px-3 disabled:opacity-30 font-sans ml-auto"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
