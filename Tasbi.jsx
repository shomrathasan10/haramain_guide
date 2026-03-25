import { useState } from "react";

export default function Tasbi() {
  const [count, setCount] = useState(0);

  return (
    <div className="container-x section-y">
      <h1 className="mb-6 text-3xl font-bold">Tasbi Counter</h1>
      <div className="mx-auto max-w-xl rounded-3xl bg-white p-10 text-center shadow-xl ring-1 ring-slate-200">
        <div className="text-6xl font-bold text-emerald-700">{count}</div>
        <div className="mt-8 flex justify-center gap-4">
          <button onClick={() => setCount(count + 1)} className="rounded-xl bg-emerald-600 px-6 py-3 font-semibold text-white">Tap Count</button>
          <button onClick={() => setCount(0)} className="rounded-xl bg-rose-600 px-6 py-3 font-semibold text-white">Reset</button>
        </div>
      </div>
    </div>
  );
}