import { useEffect, useState } from "react";
import { apiGet } from "../lib/api";
import { useAuth } from "../context/AuthContext";
import AdminLayout from "../components/AdminLayout";

export default function AdminDonations() {
  const { token } = useAuth();
  const [items, setItems] = useState([]);

  useEffect(() => {
    apiGet("/donations", token).then(setItems);
  }, [token]);

  return (
    <AdminLayout title="Donations">
      <div className="grid gap-4">
        {items.map((item) => (
          <div key={item.id} className="rounded-2xl bg-white p-5 shadow ring-1 ring-slate-200">
            <h3 className="text-xl font-bold">{item.title}</h3>
            <p className="mt-2 text-slate-600">Amount: {item.amount}</p>
            <p className="text-slate-600">Donor: {item.donor_name}</p>
            <p className="text-slate-600">Email: {item.donor_email}</p>
            <p className="mt-2 text-emerald-700">Status: {item.status}</p>
          </div>
        ))}
      </div>
    </AdminLayout>
  );
}