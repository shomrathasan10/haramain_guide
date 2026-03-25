import { useEffect, useState } from "react";
import { apiGet } from "../lib/api";

export default function Hospitals() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    apiGet("/hospitals").then(setItems);
  }, []);

  return (
    <div className="container-x section-y">
      <h1 className="mb-6 text-3xl font-bold">Hospitals</h1>

      <div className="grid gap-5 md:grid-cols-2">
        {items.map((item) => (
          <div
            key={item.id}
            className="rounded-2xl bg-white p-6 shadow ring-1 ring-slate-200"
          >
            <div className="mb-4 grid grid-cols-3 gap-2">
              <div className="h-24 rounded-lg bg-slate-100"></div>
              <div className="h-24 rounded-lg bg-slate-100"></div>
              <div className="h-24 rounded-lg bg-slate-100"></div>
            </div>

            <h3 className="text-xl font-bold">{item.name}</h3>
            <p className="mt-2 text-slate-600">{item.location}</p>
            <p className="mt-2 font-semibold text-emerald-700">{item.phone}</p>
          </div>
        ))}
      </div>
    </div>
  );
}