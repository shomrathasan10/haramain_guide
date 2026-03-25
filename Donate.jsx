import { useState } from "react";
import { apiPost } from "../lib/api";

export default function Donate() {
  const [msg, setMsg] = useState("");
  const [form, setForm] = useState({
    title: "General Donation",
    amount: "",
    donor_name: "",
    donor_email: "",
  });

  const submit = async (e) => {
    e.preventDefault();
    const res = await apiPost("/donate", form);
    setMsg(res.message || "Submitted");
  };

  return (
    <div className="container-x section-y">
      <h1 className="mb-6 text-3xl font-bold">Donate</h1>
      <form onSubmit={submit} className="max-w-2xl rounded-2xl bg-white p-6 shadow ring-1 ring-slate-200">
        <div className="grid gap-4">
          <input className="rounded-xl border px-4 py-3" placeholder="Donation title" onChange={(e) => setForm({ ...form, title: e.target.value })} />
          <input className="rounded-xl border px-4 py-3" placeholder="Amount" onChange={(e) => setForm({ ...form, amount: e.target.value })} />
          <input className="rounded-xl border px-4 py-3" placeholder="Your name" onChange={(e) => setForm({ ...form, donor_name: e.target.value })} />
          <input className="rounded-xl border px-4 py-3" placeholder="Your email" onChange={(e) => setForm({ ...form, donor_email: e.target.value })} />
          <button className="rounded-xl bg-emerald-600 py-3 text-white">Submit Donation</button>
          {msg ? <div className="rounded-xl bg-emerald-50 px-4 py-3 text-emerald-700">{msg}</div> : null}
        </div>
      </form>
    </div>
  );
}