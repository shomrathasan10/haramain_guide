import { useEffect, useState } from "react";
import { apiDelete, apiGet, apiPost } from "../lib/api";
import { useAuth } from "../context/AuthContext";
import AdminLayout from "../components/AdminLayout";

export default function AdminHajj() {
  const { token } = useAuth();
  const [items, setItems] = useState([]);
  const [form, setForm] = useState({ title: "", description: "" });

  const load = () => apiGet("/hajj").then(setItems);
  useEffect(() => { load(); }, []);

  const submit = async (e) => {
    e.preventDefault();
    await apiPost("/hajj", form, token);
    setForm({ title: "", description: "" });
    load();
  };

  const remove = async (id) => {
    await apiDelete(`/hajj/${id}`, token);
    load();
  };

  return (
    <AdminLayout title="Manage Hajj">
      <form onSubmit={submit} className="rounded-2xl bg-white p-6 shadow ring-1 ring-slate-200">
        <div className="grid gap-4">
          <input className="rounded-xl border px-4 py-3" value={form.title} placeholder="Title" onChange={(e) => setForm({ ...form, title: e.target.value })} />
          <textarea className="rounded-xl border px-4 py-3" rows="4" value={form.description} placeholder="Description" onChange={(e) => setForm({ ...form, description: e.target.value })}></textarea>
          <button className="rounded-xl bg-emerald-600 py-3 text-white">Add Hajj Step</button>
        </div>
      </form>

      <div className="mt-8 grid gap-4">
        {items.map((item) => (
          <div key={item.id} className="rounded-2xl bg-white p-5 shadow ring-1 ring-slate-200">
            <h3 className="text-xl font-bold">{item.title}</h3>
            <p className="mt-2 text-slate-600">{item.description}</p>
            <button onClick={() => remove(item.id)} className="mt-4 rounded-xl bg-rose-100 px-4 py-2 text-rose-700">Delete</button>
          </div>
        ))}
      </div>
    </AdminLayout>
  );
}