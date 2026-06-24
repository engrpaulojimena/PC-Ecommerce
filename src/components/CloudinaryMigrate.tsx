"use client";

import { useState } from "react";

interface MigrateResult {
  id: number;
  name: string;
  status: "ok" | "error";
  url?: string;
  error?: string;
}

export default function CloudinaryMigrate({ base64Count }: { base64Count: number }) {
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [results, setResults] = useState<MigrateResult[]>([]);
  const [summary, setSummary] = useState<{ migrated: number; failed: number } | null>(null);
  const [error, setError] = useState("");

  if (base64Count === 0 && !done) return null;

  const handleMigrate = async () => {
    if (!confirm(`Mag-migrate ng ${base64Count} image(s) mula sa database papunta sa Cloudinary. Itutuloy?`)) return;
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/migrate", { method: "POST" });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Migration failed");
      setResults(data.results ?? []);
      setSummary({ migrated: data.migrated, failed: data.failed });
      setDone(true);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      background: done && summary?.failed === 0
        ? "rgba(16,185,129,0.06)"
        : "rgba(245,158,11,0.06)",
      border: `1px solid ${done && summary?.failed === 0 ? "rgba(16,185,129,0.25)" : "rgba(245,158,11,0.3)"}`,
      borderRadius: "var(--radius-lg)",
      padding: "20px 24px",
      marginBottom: 28,
    }}>
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 16, flexWrap: "wrap" }}>
        <div>
          {!done ? (
            <>
              <div style={{ fontWeight: 700, color: "var(--warn)", fontFamily: "var(--font-display)", fontSize: "0.95rem", marginBottom: 4 }}>
                ⚠️ {base64Count} image{base64Count !== 1 ? "s" : ""} naka-store sa database bilang base64
              </div>
              <div style={{ color: "var(--text-dim)", fontSize: "0.82rem", lineHeight: 1.6 }}>
                Mabagal mag-load at maraming space ang kinukuha. I-migrate sa Cloudinary para maging mas mabilis at gumagana kahit saan (local at production).
              </div>
              {error && (
                <div style={{ marginTop: 10, color: "var(--danger)", fontSize: "0.82rem", background: "rgba(239,68,68,0.08)", padding: "8px 12px", borderRadius: "var(--radius-sm)" }}>
                  {error}
                </div>
              )}
            </>
          ) : (
            <>
              <div style={{ fontWeight: 700, color: summary?.failed === 0 ? "var(--good)" : "var(--warn)", fontFamily: "var(--font-display)", fontSize: "0.95rem", marginBottom: 4 }}>
                {summary?.failed === 0 ? "✅" : "⚠️"} Migration {summary?.failed === 0 ? "complete" : "partial"}
              </div>
              <div style={{ color: "var(--text-dim)", fontSize: "0.82rem" }}>
                {summary?.migrated} migrated · {summary?.failed} failed
              </div>
            </>
          )}
        </div>

        {!done && (
          <button
            className="btn btn-solid"
            onClick={handleMigrate}
            disabled={loading}
            style={{ flexShrink: 0, whiteSpace: "nowrap" }}
          >
            {loading ? (
              <span style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <span style={{ width: 14, height: 14, border: "2px solid rgba(255,255,255,0.3)", borderTopColor: "#fff", borderRadius: "50%", animation: "spin 0.8s linear infinite", display: "inline-block" }} />
                Migrating…
              </span>
            ) : "Migrate to Cloudinary →"}
          </button>
        )}
      </div>

      {/* Results list */}
      {results.length > 0 && (
        <div style={{ marginTop: 16, display: "flex", flexDirection: "column", gap: 6 }}>
          {results.map((r) => (
            <div key={r.id} style={{
              display: "flex", alignItems: "center", gap: 10,
              fontSize: "0.8rem", fontFamily: "var(--font-mono)",
              color: r.status === "ok" ? "var(--good)" : "var(--danger)",
            }}>
              <span>{r.status === "ok" ? "✓" : "✗"}</span>
              <span style={{ color: "var(--text)", flex: 1 }}>{r.name}</span>
              {r.status === "ok" && (
                <a href={r.url} target="_blank" rel="noopener noreferrer"
                  style={{ color: "var(--accent)", fontSize: "0.72rem", textDecoration: "underline" }}>
                  view
                </a>
              )}
              {r.status === "error" && (
                <span style={{ color: "var(--danger)", fontSize: "0.72rem" }}>{r.error}</span>
              )}
            </div>
          ))}
        </div>
      )}

      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}
