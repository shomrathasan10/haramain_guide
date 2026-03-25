import { useEffect, useState } from "react";
import { apiDelete, apiGet, apiPost } from "../lib/api";
import { useAuth } from "../context/AuthContext";
import AdminLayout from "../components/AdminLayout";

export default function AdminHotels() {
  const { token } = useAuth();
  const [items, setItems] = useState([]);
  const [message, setMessage] = useState("");

  const [form, setForm] = useState({
    name: "",
    location: "",
    room_count: "",
    haram_distance_value: "",
    haram_distance_unit: "m",
    nabawi_distance_value: "",
    nabawi_distance_unit: "km",
    image1: null,
    image2: null,
    image3: null,
    image4: null,
  });

  const load = () => apiGet("/hotels").then(setItems);

  useEffect(() => {
    load();
  }, []);

  const submit = async (e) => {
    e.preventDefault();
    setMessage("");

    const fd = new FormData();
    fd.append("name", form.name);
    fd.append("location", form.location);
    fd.append("room_count", form.room_count);
    fd.append("haram_distance_value", form.haram_distance_value);
    fd.append("haram_distance_unit", form.haram_distance_unit);
    fd.append("nabawi_distance_value", form.nabawi_distance_value);
    fd.append("nabawi_distance_unit", form.nabawi_distance_unit);

    if (form.image1) fd.append("image1", form.image1);
    if (form.image2) fd.append("image2", form.image2);
    if (form.image3) fd.append("image3", form.image3);
    if (form.image4) fd.append("image4", form.image4);

    const res = await apiPost("/hotels", fd, token, true);

    if (res.success) {
      setMessage("Hotel added successfully.");
      setForm({
        name: "",
        location: "",
        room_count: "",
        haram_distance_value: "",
        haram_distance_unit: "m",
        nabawi_distance_value: "",
        nabawi_distance_unit: "km",
        image1: null,
        image2: null,
        image3: null,
        image4: null,
      });
      load();
    } else {
      setMessage(res.message || "Failed to add hotel.");
    }
  };

  const remove = async (id) => {
    await apiDelete(`/hotels/${id}`, token);
    load();
  };

  return (
    <AdminLayout title="Manage Hotels">
      {message ? (
        <div className="mb-4 rounded-xl bg-emerald-50 px-4 py-3 text-emerald-700">
          {message}
        </div>
      ) : null}

      <form onSubmit={submit} className="rounded-2xl bg-white p-6 shadow ring-1 ring-slate-200">
        <div className="grid gap-4">
          <input
            className="rounded-xl border px-4 py-3"
            placeholder="Hotel Name"
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
            placeholder="Room Count"
            value={form.room_count}
            onChange={(e) => setForm({ ...form, room_count: e.target.value })}
          />

          <div className="grid gap-3 md:grid-cols-2">
            <input
              className="rounded-xl border px-4 py-3"
              placeholder="Masjidul Haram Distance"
              value={form.haram_distance_value}
              onChange={(e) => setForm({ ...form, haram_distance_value: e.target.value })}
            />
            <select
              className="rounded-xl border px-4 py-3"
              value={form.haram_distance_unit}
              onChange={(e) => setForm({ ...form, haram_distance_unit: e.target.value })}
            >
              <option value="m">m</option>
              <option value="km">km</option>
            </select>
          </div>

          <div className="grid gap-3 md:grid-cols-2">
            <input
              className="rounded-xl border px-4 py-3"
              placeholder="Masjid an-Nabawi Distance"
              value={form.nabawi_distance_value}
              onChange={(e) => setForm({ ...form, nabawi_distance_value: e.target.value })}
            />
            <select
              className="rounded-xl border px-4 py-3"
              value={form.nabawi_distance_unit}
              onChange={(e) => setForm({ ...form, nabawi_distance_unit: e.target.value })}
            >
              <option value="m">m</option>
              <option value="km">km</option>
            </select>
          </div>

          <input type="file" onChange={(e) => setForm({ ...form, image1: e.target.files[0] })} />
          <input type="file" onChange={(e) => setForm({ ...form, image2: e.target.files[0] })} />
          <input type="file" onChange={(e) => setForm({ ...form, image3: e.target.files[0] })} />
          <input type="file" onChange={(e) => setForm({ ...form, image4: e.target.files[0] })} />

          <button className="rounded-xl bg-emerald-600 py-3 text-white">
            Add Hotel
          </button>
        </div>
      </form>

      <div className="mt-8 grid gap-4 md:grid-cols-2">
        {items.map((item) => (
          <div key={item.id} className="rounded-2xl bg-white p-5 shadow ring-1 ring-slate-200">
            <h3 className="text-xl font-bold">{item.name}</h3>
            <p className="mt-2 text-slate-600">{item.location}</p>
            <p>Rooms: {item.room_count}</p>
            <p className="mt-2 text-emerald-700">
              Masjidul Haram: {item.haram_distance_value} {item.haram_distance_unit}
            </p>
            <p className="text-emerald-700">
              Masjid an-Nabawi: {item.nabawi_distance_value} {item.nabawi_distance_unit}
            </p>
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