"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { showError, showSuccess } from "@/utils/toast";

type Campaign = {
  id: number;
  subject: string;
  status: string;
  batch_size: number;
  created_at: string;
  started_at: string | null;
  finished_at: string | null;
};

const Admin: React.FC = () => {
  const [token, setToken] = React.useState<string>(() => localStorage.getItem("adminToken") || "");
  const [campaigns, setCampaigns] = React.useState<Campaign[]>([]);
  const [loading, setLoading] = React.useState(false);

  const [subject, setSubject] = React.useState("");
  const [text, setText] = React.useState("");

  const headers = React.useMemo(
    () => (token ? { "Content-Type": "application/json", "X-Admin-Token": token } : { "Content-Type": "application/json" }),
    [token]
  );

  const loadCampaigns = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/admin/campaigns.php", { headers });
      const json = await res.json();
      if (!res.ok || !json?.ok) throw new Error(json?.error || "Kon campagnes niet laden");
      setCampaigns(json.items || []);
    } catch (e: any) {
      showError(e.message || "Fout bij laden");
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    if (token) {
      localStorage.setItem("adminToken", token);
      loadCampaigns();
    }
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
      const res = await fetch("/api/admin/campaigns.php", {
        method: "POST",
        headers,
        body: JSON.stringify({ subject: subject.trim(), text: text.trim(), batch_size: 20 }),
      });
      const json = await res.json();
      if (!res.ok || !json?.ok) throw new Error(json?.error || "Opslaan mislukt");
      showSuccess("Campagne aangemaakt");
      setSubject("");
      setText("");
      loadCampaigns();
    } catch (e: any) {
      showError(e.message || "Fout bij opslaan");
    }
  };

  const queueAndStart = async (id: number) => {
    try {
      const res = await fetch("/api/admin/campaign_queue.php", {
        method: "POST",
        headers,
        body: JSON.stringify({ campaign_id: id, start: true }),
      });
      const json = await res.json();
      if (!res.ok || !json?.ok) throw new Error(json?.error || "Queue mislukt");
      showSuccess(`Gequeued: ${json.queued}. Status: ${json.status}`);
      loadCampaigns();
    } catch (e: any) {
      showError(e.message || "Fout bij queue");
    }
  };

  const control = async (id: number, action: "start" | "pause" | "resume" | "stop") => {
    try {
      const res = await fetch("/api/admin/campaign_status.php", {
        method: "POST",
        headers,
        body: JSON.stringify({ campaign_id: id, action }),
      });
      const json = await res.json();
      if (!res.ok || !json?.ok) throw new Error(json?.error || "Actie mislukt");
      showSuccess(`Status: ${json.status}`);
      loadCampaigns();
    } catch (e: any) {
      showError(e.message || "Fout bij statuswijziging");
    }
  };

  const workerRun = async (max = 20) => {
    try {
      const res = await fetch(`/api/worker/send_queue.php?max=${max}`, { headers });
      const json = await res.json();
      if (!res.ok || !json?.ok) throw new Error(json?.error || "Worker fout");
      showSuccess(`Verwerkt: ${json.processed}, verzonden: ${json.sent}, gefaald: ${json.failed}`);
      loadCampaigns();
    } catch (e: any) {
      showError(e.message || "Fout bij worker");
    }
  };

  const openStatus = async (id: number) => {
    try {
      const res = await fetch(`/api/admin/campaign_status.php?campaign_id=${id}`, { headers });
      const json = await res.json();
      if (!res.ok || !json?.ok) throw new Error(json?.error || "Status laden mislukt");
      const r = json.recipients || {};
      const msg = `Status: ${json.campaign.status}\nqueued: ${r.queued || 0}\nsent: ${r.sent || 0}\nfailed: ${r.failed || 0}\nskipped: ${r.skipped || 0}`;
      showSuccess(msg);
    } catch (e: any) {
      showError(e.message || "Fout bij status");
    }
  };

  return (
    <div className="min-h-screen bg-zutly-tiffany-light/10 py-10">
      <div className="container mx-auto px-4 max-w-5xl space-y-8">
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
              Token wordt lokaal opgeslagen en meegestuurd bij admin-aanvragen.
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
            <div className="flex gap-3">
              <Button variant="secondary" onClick={loadCampaigns}>Vernieuwen</Button>
              <Button variant="outline" onClick={() => workerRun(20)}>Worker nu draaien (20)</Button>
            </div>
            {campaigns.length === 0 ? (
              <div className="text-sm text-gray-600">Nog geen campagnes.</div>
            ) : (
              <div className="space-y-3">
                {campaigns.map((c) => (
                  <div key={c.id} className="border rounded-md p-3 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                    <div className="space-y-1">
                      <div className="font-medium">{c.subject}</div>
                      <div className="text-xs text-gray-600">#{c.id} • status: <Badge variant="secondary">{c.status}</Badge> • batch: {c.batch_size}</div>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <Button size="sm" onClick={() => openStatus(c.id)}>Status</Button>
                      <Button size="sm" variant="secondary" onClick={() => queueAndStart(c.id)}>Queue + Start</Button>
                      <Button size="sm" variant="outline" onClick={() => control(c.id, "pause")}>Pauzeer</Button>
                      <Button size="sm" variant="outline" onClick={() => control(c.id, "resume")}>Hervat</Button>
                      <Button size="sm" variant="destructive" onClick={() => control(c.id, "stop")}>Stop</Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Admin;