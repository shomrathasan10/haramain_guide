import { useEffect, useState } from "react";
import { apiGet } from "../lib/api";

export default function Live() {
  const [streams, setStreams] = useState([]);
  useEffect(() => { apiGet("/live").then(setStreams); }, []);

  return (
    <div className="container-x section-y">
      <h1 className="mb-6 text-3xl font-bold">Live Haramain</h1>
      <div className="grid gap-8 lg:grid-cols-2">
        {streams.map((stream) => (
          <div key={stream.id} className="rounded-2xl bg-white p-5 shadow ring-1 ring-slate-200">
            <h2 className="mb-4 text-xl font-bold">{stream.name}</h2>
            <div className="aspect-video overflow-hidden rounded-xl">
              <iframe className="h-full w-full" src={stream.url} title={stream.name} allowFullScreen />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}