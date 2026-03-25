import { useEffect, useState } from "react";
import { apiGet } from "../lib/api";

export default function Umrah() {
  const [items, setItems] = useState([]);
  useEffect(() => { apiGet("/umrah").then(setItems); }, []);

  return (
    <div className="container-x section-y">
      <h1 className="mb-6 text-3xl font-bold">Umrah Guide</h1>
      <div className="grid gap-5">
        {items.map((item) => (
          <div key={item.id} className="rounded-2xl bg-white p-6 shadow ring-1 ring-slate-200">
            <h3 className="text-xl font-bold text-emerald-700">{item.title}</h3>
            <p className="mt-2 text-slate-600">{item.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}