import { useState } from "react";
import { apiPost } from "../lib/api";

export default function Contact() {
  const [success, setSuccess] = useState("");
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });

  const submit = async (e) => {
    e.preventDefault();
    await apiPost("/messages", form);
    setSuccess("Message sent successfully.");
  };

  return (
    <div className="container-x section-y">
      <h1 className="mb-6 text-3xl font-bold">Contact</h1>
      <form onSubmit={submit} className="max-w-2xl rounded-2xl bg-white p-6 shadow ring-1 ring-slate-200">
        <div className="grid gap-4">
          <input className="rounded-xl border px-4 py-3" placeholder="Name" onChange={(e) => setForm({ ...form, name: e.target.value })} />
          <input className="rounded-xl border px-4 py-3" placeholder="Email" onChange={(e) => setForm({ ...form, email: e.target.value })} />
          <input className="rounded-xl border px-4 py-3" placeholder="Subject" onChange={(e) => setForm({ ...form, subject: e.target.value })} />
          <textarea className="rounded-xl border px-4 py-3" rows="5" placeholder="Message" onChange={(e) => setForm({ ...form, message: e.target.value })}></textarea>
          <button className="rounded-xl bg-emerald-600 py-3 text-white">Send</button>
          {success ? <div className="rounded-xl bg-emerald-50 px-4 py-3 text-emerald-700">{success}</div> : null}
        </div>
      </form>
    </div>
  );
}