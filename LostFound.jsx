import { useEffect, useState } from "react";
import { apiGet, apiPost } from "../lib/api";

export default function LostFound() {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState({ type: "lost", title: "", description: "", contact: "" });

  const load = () => apiGet("/lost-found").then(setItems);
  useEffect(() => { load(); }, []);

  const submit = async (e) => {
    e.preventDefault();
    await apiPost("/lost-found", form);
    setForm({ type: "lost", title: "", description: "", contact: "" });
    load();
  };

  return (
    <div className="container-x section-y">
      <h1 className="mb-6 text-3xl font-bold">Lost & Found</h1>

      <form onSubmit={submit} className="rounded-2xl bg-white p-6 shadow ring-1 ring-slate-200">
        <div className="grid gap-4">
          <select value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })} className="rounded-xl border px-4 py-3">
            <option value="lost">Lost</option>
            <option value="found">Found</option>
          </select>
          <input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} className="rounded-xl border px-4 py-3" placeholder="Title" />
          <textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} className="rounded-xl border px-4 py-3" rows="4" placeholder="Description"></textarea>
          <input value={form.contact} onChange={(e) => setForm({ ...form, contact: e.target.value })} className="rounded-xl border px-4 py-3" placeholder="Contact" />
          <button className="rounded-xl bg-emerald-600 py-3 text-white">Submit Report</button>
        </div>
      </form>

      <div className="mt-8 grid gap-4 md:grid-cols-2">
        {items.map((item) => (
          <div key={item.id} className="rounded-2xl bg-white p-5 shadow ring-1 ring-slate-200">
            <p className="text-sm font-semibold text-emerald-700">{item.type}</p>
            <h3 className="mt-2 text-xl font-bold">{item.title}</h3>
            <p className="mt-2 text-slate-600">{item.description}</p>
            <p className="mt-2 text-sm text-slate-500">{item.contact}</p>
          </div>
        ))}
      </div>
    </div>
  );
}