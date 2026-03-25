import { useEffect, useMemo, useState } from "react";
import { apiGet } from "../lib/api";

export default function HistoricalPlaces() {
  const [items, setItems] = useState([]);
  const [area, setArea] = useState("All");

  useEffect(() => { apiGet("/historical-places").then(setItems); }, []);

  const filtered = useMemo(() => area === "All" ? items : items.filter((x) => x.area === area), [items, area]);
  const areas = ["All", "Makkah", "Madinah", "Taif", "Jeddah"];

  return (
    <div className="container-x section-y">
      <h1 className="mb-6 text-3xl font-bold">Historical Places</h1>

      <div className="mb-6 flex flex-wrap gap-3">
        {areas.map((a) => (
          <button key={a} onClick={() => setArea(a)} className={`rounded-xl px-4 py-2 ${area === a ? "bg-emerald-600 text-white" : "bg-white ring-1 ring-slate-200"}`}>
            {a}
          </button>
        ))}
      </div>

      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {filtered.map((item) => (
          <div key={item.id} className="rounded-2xl bg-white p-6 shadow ring-1 ring-slate-200">
            <div className="mb-4 grid grid-cols-2 gap-2">
              <div className="h-24 rounded-lg bg-slate-100"></div>
              <div className="h-24 rounded-lg bg-slate-100"></div>
              <div className="h-24 rounded-lg bg-slate-100"></div>
              <div className="h-24 rounded-lg bg-slate-100"></div>
            </div>
            <p className="text-sm font-semibold text-emerald-700">{item.area}</p>
            <h3 className="mt-2 text-xl font-bold">{item.name}</h3>
            <p className="mt-2 text-slate-600">{item.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}