import { useEffect, useState } from "react";
import { apiDelete, apiGet, apiPost } from "../lib/api";
import { useAuth } from "../context/AuthContext";
import AdminLayout from "../components/AdminLayout";

export default function AdminLive() {
  const { token } = useAuth();
  const [items, setItems] = useState([]);
  const [form, setForm] = useState({ name: "", url: "", video: null });

  const load = () => apiGet("/live").then(setItems);
  useEffect(() => { load(); }, []);

  const submit = async (e) => {
    e.preventDefault();

    const fd = new FormData();
    fd.append("name", form.name);
    fd.append("url", form.url);
    if (form.video) fd.append("video", form.video);

    await apiPost("/live", fd, token, true);
    setForm({ name: "", url: "", video: null });
    load();
  };

  const remove = async (id) => {
    await apiDelete(`/live/${id}`, token);
    load();
  };

  return (
    <AdminLayout title="Manage Live Links">
      <form onSubmit={submit} className="rounded-2xl bg-white p-6 shadow ring-1 ring-slate-200">
        <div className="grid gap-4">
          <input className="rounded-xl border px-4 py-3" value={form.name} placeholder="Stream name" onChange={(e) => setForm({ ...form, name: e.target.value })} />
          <input className="rounded-xl border px-4 py-3" value={form.url} placeholder="Embed URL (optional)" onChange={(e) => setForm({ ...form, url: e.target.value })} />
          <input type="file" accept="video/*" onChange={(e) => setForm({ ...form, video: e.target.files[0] })} />
          <button className="rounded-xl bg-emerald-600 py-3 text-white">Add Stream</button>
        </div>
      </form>

      <div className="mt-8 grid gap-4">
        {items.map((item) => (
          <div key={item.id} className="rounded-2xl bg-white p-5 shadow ring-1 ring-slate-200">
            <h3 className="text-xl font-bold">{item.name}</h3>
            <p className="mt-2 break-all text-slate-600">{item.url}</p>
            <button onClick={() => remove(item.id)} className="mt-4 rounded-xl bg-rose-100 px-4 py-2 text-rose-700">Delete</button>
          </div>
        ))}
      </div>
    </AdminLayout>
  );
}