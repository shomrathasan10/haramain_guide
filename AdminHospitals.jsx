import { useEffect, useState } from "react";
import { apiDelete, apiGet, apiPost } from "../lib/api";
import { useAuth } from "../context/AuthContext";
import AdminLayout from "../components/AdminLayout";

export default function AdminHospitals() {
  const { token } = useAuth();
  const [items, setItems] = useState([]);
  const [message, setMessage] = useState("");

  const [form, setForm] = useState({
    name: "",
    location: "",
    phone: "",
    image1: null,
    image2: null,
    image3: null,
  });

  const load = () => apiGet("/hospitals").then(setItems);

  useEffect(() => {
    load();
  }, []);

  const submit = async (e) => {
    e.preventDefault();
    setMessage("");

    const fd = new FormData();
    fd.append("name", form.name);
    fd.append("location", form.location);
    fd.append("phone", form.phone);
    if (form.image1) fd.append("image1", form.image1);
    if (form.image2) fd.append("image2", form.image2);
    if (form.image3) fd.append("image3", form.image3);

    const res = await apiPost("/hospitals", fd, token, true);

    if (res.success) {
      setMessage("Hospital added successfully.");
      setForm({
        name: "",
        location: "",
        phone: "",
        image1: null,
        image2: null,
        image3: null,
      });
      load();
    } else {
      setMessage(res.message || "Failed to add hospital.");
    }
  };

  const remove = async (id) => {
    await apiDelete(`/hospitals/${id}`, token);
    load();
  };

  return (
    <AdminLayout title="Manage Hospitals">
      {message ? (
        <div className="mb-4 rounded-xl bg-emerald-50 px-4 py-3 text-emerald-700">
          {message}
        </div>
      ) : null}

      <form onSubmit={submit} className="rounded-2xl bg-white p-6 shadow ring-1 ring-slate-200">
        <div className="grid gap-4">
          <input
            className="rounded-xl border px-4 py-3"
            placeholder="Hospital Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
          <input
            className="rounded-xl border px-4 py-3"
            placeholder="Location"
            value={form.location}
            onChange={(e) => setForm({ ...form, location: e.target.value })}
          />
          <input
            className="rounded-xl border px-4 py-3"
            placeholder="Phone Number"
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
          />

          <input type="file" onChange={(e) => setForm({ ...form, image1: e.target.files[0] })} />
          <input type="file" onChange={(e) => setForm({ ...form, image2: e.target.files[0] })} />
          <input type="file" onChange={(e) => setForm({ ...form, image3: e.target.files[0] })} />

          <button className="rounded-xl bg-emerald-600 py-3 text-white">
            Add Hospital
          </button>
        </div>
      </form>

      <div className="mt-8 grid gap-4 md:grid-cols-2">
        {items.map((item) => (
          <div key={item.id} className="rounded-2xl bg-white p-5 shadow ring-1 ring-slate-200">
            <h3 className="text-xl font-bold">{item.name}</h3>
            <p className="mt-2 text-slate-600">{item.location}</p>
            <p className="mt-2 text-emerald-700">{item.phone}</p>
            <button
              onClick={() => remove(item.id)}
              className="mt-4 rounded-xl bg-rose-100 px-4 py-2 text-rose-700"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </AdminLayout>
  );
}