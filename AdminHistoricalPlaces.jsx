import { useEffect, useState } from "react";
import { apiDelete, apiGet, apiPost } from "../lib/api";
import { useAuth } from "../context/AuthContext";
import AdminLayout from "../components/AdminLayout";

export default function AdminHistoricalPlaces() {
  const { token } = useAuth();
  const [items, setItems] = useState([]);
  const [form, setForm] = useState({
    area: "Makkah",
    name: "",
    description: "",
    image1: null,
    image2: null,
    image3: null,
    image4: null,
  });

  const load = () => apiGet("/historical-places").then(setItems);
  useEffect(() => { load(); }, []);

  const submit = async (e) => {
    e.preventDefault();

    const fd = new FormData();
    fd.append("area", form.area);
    fd.append("name", form.name);
    fd.append("description", form.description);
    if (form.image1) fd.append("image1", form.image1);
    if (form.image2) fd.append("image2", form.image2);
    if (form.image3) fd.append("image3", form.image3);
    if (form.image4) fd.append("image4", form.image4);

    await apiPost("/historical-places", fd, token, true);
    setForm({
      area: "Makkah",
      name: "",
      description: "",
      image1: null,
      image2: null,
      image3: null,
      image4: null,
    });
    load();
  };

  const remove = async (id) => {
    await apiDelete(`/historical-places/${id}`, token);
    load();
  };

  return (
    <AdminLayout title="Manage Historical Places">
      <form onSubmit={submit} className="rounded-2xl bg-white p-6 shadow ring-1 ring-slate-200">
        <div className="grid gap-4">
          <select className="rounded-xl border px-4 py-3" value={form.area} onChange={(e) => setForm({ ...form, area: e.target.value })}>
            <option>Makkah</option>
            <option>Madinah</option>
            <option>Taif</option>
            <option>Jeddah</option>
          </select>

          <input className="rounded-xl border px-4 py-3" placeholder="Place name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
          <textarea className="rounded-xl border px-4 py-3" rows="4" placeholder="Description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })}></textarea>

          <input type="file" onChange={(e) => setForm({ ...form, image1: e.target.files[0] })} />
          <input type="file" onChange={(e) => setForm({ ...form, image2: e.target.files[0] })} />
          <input type="file" onChange={(e) => setForm({ ...form, image3: e.target.files[0] })} />
          <input type="file" onChange={(e) => setForm({ ...form, image4: e.target.files[0] })} />

          <button className="rounded-xl bg-emerald-600 py-3 text-white">Add Historical Place</button>
        </div>
      </form>

      <div className="mt-8 grid gap-4 md:grid-cols-2">
        {items.map((item) => (
          <div key={item.id} className="rounded-2xl bg-white p-5 shadow ring-1 ring-slate-200">
            <p className="text-sm font-semibold text-emerald-700">{item.area}</p>
            <h3 className="mt-2 text-xl font-bold">{item.name}</h3>
            <p className="mt-2 text-slate-600">{item.description}</p>
            <button onClick={() => remove(item.id)} className="mt-4 rounded-xl bg-rose-100 px-4 py-2 text-rose-700">Delete</button>
          </div>
        ))}
      </div>
    </AdminLayout>
  );
}