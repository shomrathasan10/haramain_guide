import { useEffect, useState } from "react";
import { apiGet } from "../lib/api";
import { useAuth } from "../context/AuthContext";
import AdminLayout from "../components/AdminLayout";

export default function AdminLostFound() {
  const { token } = useAuth();
  const [items, setItems] = useState([]);

  useEffect(() => {
    apiGet("/lost-found", token).then(setItems);
  }, [token]);

  return (
    <AdminLayout title="Lost & Found Reports">
      <div className="grid gap-4">
        {items.map((item) => (
          <div key={item.id} className="rounded-2xl bg-white p-5 shadow ring-1 ring-slate-200">
            <p className="text-sm font-semibold text-emerald-700">{item.type}</p>
            <h3 className="mt-2 text-xl font-bold">{item.title}</h3>
            <p className="mt-2 text-slate-600">{item.description}</p>
            <p className="mt-2 text-slate-500">{item.contact}</p>
          </div>
        ))}
      </div>
    </AdminLayout>
  );
}