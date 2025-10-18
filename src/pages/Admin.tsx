"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { showError, showSuccess } from "@/utils/toast";
import ApiStatus from "@/components/ApiStatus";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";

type Campaign = {
  id: number;
  subject: string;
  status: string;
  batch_size: number;
  created_at: string;
  started_at: string | null;
  finished_at: string | null;
};

type Subscriber = {
  id: number;
  email: string;
  created_at: string;
};

type RecipientRow = {
  id: number;
  email: string;
  status: string;
  attempts: number;
  last_error: string | null;
  sent_at: string | null;
  created_at: string;
};

const Admin: React.FC = () => {
  const [token, setToken] = React.useState<string>(() => localStorage.getItem("adminToken") || "");
  const [campaigns, setCampaigns] = React.useState<Campaign[]>([]);
  const [loading, setLoading] = React.useState(false);

  const [subject, setSubject] = React.useState("");
  const [text, setText] = React.useState("");

  const [subs, setSubs] = React.useState<Subscriber[]>([]);
  const [subsLoading, setSubsLoading] = React.useState(false);

  // Failures dialog state
  const [failOpen, setFailOpen] = React.useState(false);
  const [failCampaign, setFailCampaign] = React.useState<number | null>(null);
  const [failItems, setFailItems] = React.useState<RecipientRow[]>([]);
  const [failLoading, setFailLoading] = React.useState(false);

  // In DEV richt naar productie PHP, omdat Vite geen PHP uitvoert.
  const apiBase = React.useMemo(() => (import.meta.env.DEV ? "https://www.zutly.nl" : ""), []);

  const headers = React.useMemo(
    () =>
      token
        ? { "Content-Type": "application/json", Accept: "application/json", "X-Admin-Token": token }
        : { "Content-Type": "application/json", Accept: "application/json" },
    [token]
  );

  async function fetchJson(path: string, init?: RequestInit) {
    const url = `${apiBase}${path}`;
    const res = await fetch(url, { ...init, headers: { ...(init?.headers || {}), ...headers } });
    const text = await res.text();
    try {
      const json = JSON.parse(text);
      return { res, json };
    } catch {
      const hint = import.meta.env.DEV
        ? "Ontving geen geldige JSON (waarschijnlijk wordt PHP niet uitgevoerd in development of CORS blokkeert de request)."
        : "Onverwachte serverrespons.";
      throw new Error(`${hint} Response start: ${text.slice(0, 120)}`);
    }
  }

  const loadCampaigns = async () => {
    try {
      if (!token) {
        showError("Voer eerst je admin token in.");
        return;
      }
      setLoading(true);
      const { res, json } = await fetchJson("/api/admin/campaigns.php");
      if (!res.ok || !json?.ok) throw new Error(json?.error || "Kon campagnes niet laden");
      setCampaigns(json.items || []);
    } catch (e: any) {
      showError(e.message || "Fout bij laden");
    } finally {
      setLoading(false);
    }
  };

  // Token alleen lokaal opslaan; geen auto-calls
  React.useEffect(() => {
    localStorage.setItem("adminToken", token || "");
  }, [token]);

  const saveCampaign = async () => {
    if (!token) {
      showError("Voer eerst je admin token in.");
      return;
    }
    if (!subject.trim() || !text.trim()) {
      showError("Onderwerp en tekst zijn verplicht.");
      return;
    }
    try {
      const { res, json } = await fetchJson("/api/admin/campaigns.php", {
        method: "POST",
        body: JSON.stringify({ subject: subject.trim(), text: text.trim(), batch_size: 20 }),
      });
      if (!res.ok || !json?.ok) throw new Error(json?.error || "Opslaan mislukt");
      showSuccess("Campagne aangemaakt");
      setSubject("");
      setText("");
    } catch (e: any) {
      showError(e.message || "Fout bij opslaan");
    }
  };

  const queueAndStart = async (id: number) => {
    if (!token) {
      showError("Voer eerst je admin token in.");
      return;
    }
    try {
      const { res, json } = await fetchJson("/api/admin/campaign_queue.php", {
        method: "POST",
        body: JSON.stringify({ campaign_id: id, start: true }),
      });
      if (!res.ok || !json?.ok) throw new Error(json?.error || "Queue mislukt");
      showSuccess(`Gequeued: ${json.queued}. Status: ${json.status}`);
    } catch (e: any) {
      showError(e.message || "Fout bij queue");
    }
  };

  const control = async (id: number, action: "start" | "pause" | "resume" | "stop") => {
    if (!token) {
      showError("Voer eerst je admin token in.");
      return;
    }
    try {
      const { res, json } = await fetchJson("/api/admin/campaign_status.php", {
        method: "POST",
        body: JSON.stringify({ campaign_id: id, action }),
      });
      if (!res.ok || !json?.ok) throw new Error(json?.error || "Actie mislukt");
      showSuccess(`Status: ${json.status}`);
    } catch (e: any) {
      showError(e.message || "Fout bij statuswijziging");
    }
  };

  const deleteCampaign = async (id: number) => {
    if (!token) {
      showError("Voer eerst je admin token in.");
      return;
    }
    const ok = window.confirm("Weet je zeker dat je deze campagne wilt verwijderen?");
    if (!ok) return;
    try {
      const { res, json } = await fetchJson("/api/admin/campaign_delete.php", {
        method: "POST",
        body: JSON.stringify({ campaign_id: id }),
      });
      if (!res.ok || !json?.ok) throw new Error(json?.error || "Verwijderen mislukt");
      showSuccess("Campagne verwijderd");
      await loadCampaigns();
    } catch (e: any) {
      showError(e.message || "Fout bij verwijderen");
    }
  };

  const loadSubscribers = async () => {
    if (!token) {
      showError("Voer eerst je admin token in.");
      return;
    }
    try {
      setSubsLoading(true);
      const { res, json } = await fetchJson("/api/admin/subscribers.php");
      if (!res.ok || !json?.ok) throw new Error(json?.error || "Kon abonnees niet laden");
      setSubs((json.items || []) as Subscriber[]);
      showSuccess(`Abonnees geladen: ${(json.items || []).length}`);
    } catch (e: any) {
      showError(e.message || "Fout bij laden abonnees");
    } finally {
      setSubsLoading(false);
    }
  };

  const workerRun = async (max = 20) => {
    if (!token) {
      showError("Voer eerst je admin token in.");
      return;
    }
    try {
      const { res, json } = await fetchJson(`/api/worker/send_queue.php?max=${max}`);
      if (!res.ok || !json?.ok) throw new Error(json?.error || "Worker fout");
      showSuccess(`Verwerkt: ${json.processed}, verzonden: ${json.sent}, gefaald: ${json.failed}`);
    } catch (e: any) {
      showError(e.message || "Fout bij worker");
    }
  };

  const openStatus = async (id: number) => {
    if (!token) {
      showError("Voer eerst je admin token in.");
      return;
    }
    try {
      const { res, json } = await fetchJson(`/api/admin/campaign_status.php?campaign_id=${id}`);
      if (!res.ok || !json?.ok) throw new Error(json?.error || "Status laden mislukt");
      const r = json.recipients || {};
      const msg = `Status: ${json.campaign.status}\nqueued: ${r.queued || 0}\nsent: ${r.sent || 0}\nfailed: ${r.failed || 0}\nskipped: ${r.skipped || 0}`;
      showSuccess(msg);
    } catch (e: any) {
      showError(e.message || "Fout bij status");
    }
  };

  const loadFailures = async (id: number) => {
    if (!token) {
      showError("Voer eerst je admin token in.");
      return;
    }
    try {
      setFailCampaign(id);
      setFailLoading(true);
      setFailOpen(true);
      const { res, json } = await fetchJson(`/api/admin/campaign_recipients.php?campaign_id=${id}&status=failed&limit=100`);
      if (!res.ok || !json?.ok) throw new Error(json?.error || "Kon mislukkingen niet laden");
      setFailItems((json.items || []) as RecipientRow[]);
    } catch (e: any) {
      showError(e.message || "Fout bij laden mislukkingen");
    } finally {
      setFailLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-zutly-tiffany-light/10 py-10">
      <div className="container mx-auto px-4 max-w-6xl space-y-8">
        <ApiStatus />

        <Card className="shadow-md">
          <CardHeader>
            <CardTitle>Admin toegang</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Label htmlFor="token">Admin token (X-Admin-Token)</Label>
            <Input
              id="token"
              type="password"
              placeholder="Plak je geheime token"
              value={token}
              onChange={(e) => setToken(e.target.value)}
            />
            <div className="text-xs text-gray-600">
              Het token wordt alleen lokaal opgeslagen. Er worden geen calls gedaan totdat je op een knop klikt.
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-md">
          <CardHeader>
            <CardTitle>Nieuwe campagne</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="subject">Onderwerp</Label>
              <Input id="subject" value={subject} onChange={(e) => setSubject(e.target.value)} />
            </div>
            <div>
              <Label htmlFor="text">Tekst (plain text)</Label>
              <Textarea id="text" rows={8} value={text} onChange={(e) => setText(e.target.value)} />
            </div>
            <div className="flex gap-3">
              <Button onClick={saveCampaign}>Opslaan</Button>
              <Button variant="secondary" onClick={() => { setSubject(""); setText(""); }}>Wissen</Button>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-md">
          <CardHeader>
            <CardTitle>Campagnes {loading && <Badge className="ml-2">laden…</Badge>}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-wrap gap-3">
              <Button variant="secondary" onClick={loadCampaigns}>Vernieuwen</Button>
              <Button variant="outline" onClick={() => workerRun(20)}>Worker nu draaien (20)</Button>
            </div>
            {campaigns.length === 0 ? (
              <div className="text-sm text-gray-600">Nog geen campagnes. Klik “Vernieuwen” om te laden.</div>
            ) : (
              <div className="space-y-3">
                {campaigns.map((c) => (
                  <div key={c.id} className="border rounded-md p-3 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                    <div className="space-y-1">
                      <div className="font-medium">{c.subject}</div>
                      <div className="text-xs text-gray-600">
                        #{c.id} • status: <Badge variant="secondary">{c.status}</Badge> • batch: {c.batch_size}
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <Button size="sm" onClick={() => openStatus(c.id)}>Status</Button>
                      <Button size="sm" variant="secondary" onClick={() => queueAndStart(c.id)}>Queue + Start</Button>
                      <Button size="sm" variant="outline" onClick={() => control(c.id, "pause")}>Pauzeer</Button>
                      <Button size="sm" variant="outline" onClick={() => control(c.id, "resume")}>Hervat</Button>
                      <Button size="sm" variant="destructive" onClick={() => control(c.id, "stop")}>Stop</Button>
                      <Button size="sm" variant="outline" onClick={() => loadFailures(c.id)}>Mislukkingen</Button>
                      <Button size="sm" variant="destructive" onClick={() => deleteCampaign(c.id)}>Verwijder</Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="shadow-md">
          <CardHeader>
            <CardTitle>Nieuwsbrief abonnees {subsLoading && <Badge className="ml-2">laden…</Badge>}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-3">
              <Button variant="secondary" onClick={loadSubscribers}>Laad abonnees</Button>
              {subs.length > 0 && <Badge variant="outline">{subs.length} actief</Badge>}
            </div>
            {subs.length === 0 ? (
              <div className="text-sm text-gray-600">Nog geen abonnees geladen.</div>
            ) : (
              <ScrollArea className="h-72 rounded-md border p-3 bg-white">
                <div className="space-y-2">
                  {subs.map((s) => (
                    <div key={s.id} className="flex items-center justify-between border-b last:border-0 pb-2">
                      <div className="text-sm">{s.email}</div>
                      <div className="text-xs text-gray-500">{new Date(s.created_at).toLocaleString()}</div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Failures dialog */}
      <Dialog open={failOpen} onOpenChange={setFailOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Mislukte ontvangers</DialogTitle>
            <DialogDescription>
              {failCampaign ? `Campagne #${failCampaign}` : ""} {failLoading ? " • laden…" : ""}
            </DialogDescription>
          </DialogHeader>
          {failLoading ? (
            <div className="text-sm text-gray-600">Gegevens ophalen…</div>
          ) : failItems.length === 0 ? (
            <div className="text-sm text-gray-600">Geen mislukte ontvangers gevonden.</div>
          ) : (
            <ScrollArea className="h-80 rounded-md border p-3 bg-white">
              <div className="space-y-3">
                {failItems.map((r) => (
                  <div key={r.id} className="border rounded p-2">
                    <div className="text-sm font-medium">{r.email}</div>
                    <div className="text-xs text-gray-600">
                      Pogingen: {r.attempts} • {r.sent_at ? `Laatst: ${new Date(r.sent_at).toLocaleString()}` : `Toegevoegd: ${new Date(r.created_at).toLocaleString()}`}
                    </div>
                    {r.last_error && (
                      <div className="text-xs text-red-600 mt-1 break-words">
                        Fout: {r.last_error}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </ScrollArea>
          )}
          <div className="flex justify-end gap-2 pt-2">
            {failCampaign && (
              <Button variant="secondary" onClick={() => loadFailures(failCampaign)}>Vernieuwen</Button>
            )}
            <Button onClick={() => setFailOpen(false)}>Sluiten</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Admin;