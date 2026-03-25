import { useEffect, useState } from "react";
import { apiGet, apiPost } from "../lib/api";
import { useAuth } from "../context/AuthContext";
import AdminLayout from "../components/AdminLayout";

export default function AdminMessages() {
  const { token } = useAuth();
  const [items, setItems] = useState([]);
  const [replyMap, setReplyMap] = useState({});
  const [status, setStatus] = useState("");

  useEffect(() => {
    apiGet("/messages", token).then(setItems);
  }, [token]);

  const sendReply = async (id) => {
    const reply = replyMap[id] || "";
    if (!reply.trim()) return;

    const res = await apiPost(`/messages/${id}/reply`, { reply }, token);
    setStatus(res.message || "Reply saved");
  };

  return (
    <AdminLayout title="Messages">
      {status ? (
        <div className="mb-4 rounded-xl bg-emerald-50 px-4 py-3 text-emerald-700">
          {status}
        </div>
      ) : null}

      <div className="grid gap-4">
        {items.map((item) => (
          <div key={item.id} className="rounded-2xl bg-white p-5 shadow ring-1 ring-slate-200">
            <h3 className="text-xl font-bold">{item.subject || "No subject"}</h3>
            <p className="mt-2 text-slate-600">
              <strong>{item.name}</strong> - {item.email}
            </p>
            <p className="mt-2 text-slate-600">{item.message}</p>

            <div className="mt-4 grid gap-3">
              <textarea
                rows="4"
                className="rounded-xl border px-4 py-3"
                placeholder="Write reply..."
                value={replyMap[item.id] || ""}
                onChange={(e) =>
                  setReplyMap((prev) => ({ ...prev, [item.id]: e.target.value }))
                }
              />
              <button
                onClick={() => sendReply(item.id)}
                className="w-fit rounded-xl bg-emerald-600 px-5 py-3 text-white"
              >
                Save Reply
              </button>
            </div>
          </div>
        ))}
      </div>
    </AdminLayout>
  );
}