"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

type HealthResponse = {
  ok: boolean;
  api: {
    ok: boolean;
    timestamp: string;
    php: string;
  };
  db: {
    configured: boolean;
    ok: boolean | null;
    error?: string;
  };
};

const StatusDot = ({ ok }: { ok: boolean }) => (
  <span
    className={`inline-block h-2.5 w-2.5 rounded-full mr-2 ${ok ? "bg-green-500" : "bg-red-500"}`}
    aria-hidden
  />
);

async function fetchJson(url: string): Promise<HealthResponse> {
  const res = await fetch(url, { headers: { "Cache-Control": "no-cache" } });
  const text = await res.text();
  try {
    return JSON.parse(text) as HealthResponse;
  } catch {
    throw new Error(`Ongeldige JSON van ${url}`);
  }
}

const ApiStatus: React.FC = () => {
  const [data, setData] = React.useState<HealthResponse | null>(null);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    let mounted = true;

    const load = async () => {
      try {
        if (import.meta.env.DEV) {
          // Probeer echte productie health eerst (CORS moet toegestaan zijn).
          try {
            const prod = await fetchJson("https://www.zutly.nl/api/health.php");
            if (mounted) {
              setData(prod);
              return;
            }
          } catch (e: any) {
            // Val terug op lokale mock
          }
          const local = await fetchJson("/api/health.json");
          if (mounted) setData(local);
          return;
        }

        // Productie: lokale PHP
        const php = await fetchJson("/api/health.php");
        if (mounted) setData(php);
      } catch (e: any) {
        if (mounted)
          setError(
            e?.message ||
              (import.meta.env.DEV
                ? "Kon geen health laden. Controleer CORS op https://www.zutly.nl."
                : "Fout bij laden.")
          );
      }
    };

    load();
    return () => {
      mounted = false;
    };
  }, []);

  return (
    <Card className="max-w-xl mx-auto">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">API Status</CardTitle>
      </CardHeader>
      <CardContent className="text-sm text-gray-700 space-y-2">
        {error ? (
          <div className="flex items-center">
            <StatusDot ok={false} />
            <span>API niet bereikbaar: {error}</span>
          </div>
        ) : data ? (
          <>
            <div className="flex items-center">
              <StatusDot ok={data.api.ok} />
              <span>API online</span>
              <Badge className="ml-3" variant="secondary">
                PHP {data.api.php}
              </Badge>
            </div>
            <div className="flex items-center">
              <StatusDot ok={data.db.configured ? !!data.db.ok : true} />
              <span>
                Database{" "}
                {data.db.configured ? (data.db.ok ? "verbonden" : "fout (zie serverlogs)") : "nog niet geconfigureerd"}
              </span>
            </div>
            <div className="text-xs text-gray-500">Laatst gecheckt: {new Date(data.api.timestamp).toLocaleString()}</div>
          </>
        ) : (
          <div>Bezig met laden...</div>
        )}
      </CardContent>
    </Card>
  );
};

export default ApiStatus;