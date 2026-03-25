import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function AdminLayout({ title, children }) {
  const { logout } = useAuth();

  return (
    <div className="container-x section-y">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-3xl font-bold">{title}</h1>
        <button onClick={logout} className="rounded-xl bg-rose-600 px-4 py-2 text-white">Logout</button>
      </div>

      <div className="grid gap-6 lg:grid-cols-[260px_1fr]">
        <aside className="rounded-2xl bg-white p-4 shadow ring-1 ring-slate-200">
          <div className="grid gap-2">
            <Link className="rounded-lg px-3 py-2 hover:bg-slate-100" to="/admin">Dashboard</Link>
            <Link className="rounded-lg px-3 py-2 hover:bg-slate-100" to="/admin/live">Live Links</Link>
            <Link className="rounded-lg px-3 py-2 hover:bg-slate-100" to="/admin/hajj">Hajj</Link>
            <Link className="rounded-lg px-3 py-2 hover:bg-slate-100" to="/admin/umrah">Umrah</Link>
            <Link className="rounded-lg px-3 py-2 hover:bg-slate-100" to="/admin/hospitals">Hospitals</Link>
            <Link className="rounded-lg px-3 py-2 hover:bg-slate-100" to="/admin/hotels">Hotels</Link>
            <Link className="rounded-lg px-3 py-2 hover:bg-slate-100" to="/admin/historical-places">Historical Places</Link>
            <Link className="rounded-lg px-3 py-2 hover:bg-slate-100" to="/admin/messages">Messages</Link>
            <Link className="rounded-lg px-3 py-2 hover:bg-slate-100" to="/admin/donations">Donations</Link>
            <Link className="rounded-lg px-3 py-2 hover:bg-slate-100" to="/admin/lost-found">Lost & Found</Link>
          </div>
        </aside>

        <main>{children}</main>
      </div>
    </div>
  );
}