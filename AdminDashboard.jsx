import { useEffect, useState } from "react";
import { apiGet } from "../lib/api";
import { useAuth } from "../context/AuthContext";
import AdminLayout from "../components/AdminLayout";

export default function AdminDashboard() {
  const { token } = useAuth();
  const [stats, setStats] = useState(null);

  useEffect(() => {
    apiGet("/admin/stats", token).then(setStats);
  }, [token]);

  return (
    <AdminLayout title="Admin Dashboard">
      <div className="grid gap-5 md:grid-cols-4">
        <div className="rounded-2xl bg-white p-6 shadow ring-1 ring-slate-200">Historical Places: {stats?.places ?? "--"}</div>
        <div className="rounded-2xl bg-white p-6 shadow ring-1 ring-slate-200">Hajj: {stats?.hajjSteps ?? "--"}</div>
        <div className="rounded-2xl bg-white p-6 shadow ring-1 ring-slate-200">Umrah: {stats?.umrahSteps ?? "--"}</div>
        <div className="rounded-2xl bg-white p-6 shadow ring-1 ring-slate-200">Messages: {stats?.messages ?? "--"}</div>
      </div>
    </AdminLayout>
  );
}