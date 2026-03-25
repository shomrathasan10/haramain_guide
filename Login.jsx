import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiPost } from "../lib/api";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const [username, setUsername] = useState("admin");
  const [password, setPassword] = useState("123456");
  const [error, setError] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    setError("");
    const res = await apiPost("/login", { username, password });
    if (res.token) {
      login(res.token);
      navigate("/admin");
    } else {
      setError(res.message || "Login failed");
    }
  };

  return (
    <div className="container-x section-y">
      <h1 className="mb-6 text-3xl font-bold">Admin Login</h1>
      <form onSubmit={submit} className="max-w-xl rounded-2xl bg-white p-6 shadow ring-1 ring-slate-200">
        <div className="grid gap-4">
          <input value={username} onChange={(e) => setUsername(e.target.value)} className="rounded-xl border px-4 py-3" placeholder="Username" />
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="rounded-xl border px-4 py-3" placeholder="Password" />
          <button className="rounded-xl bg-emerald-600 py-3 text-white">Login</button>
          {error ? <div className="rounded-xl bg-rose-50 px-4 py-3 text-rose-700">{error}</div> : null}
        </div>
      </form>
    </div>
  );
}