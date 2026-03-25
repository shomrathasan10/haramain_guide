import { useEffect, useState } from "react";
import { getQiblaBearing } from "../lib/qibla";

export default function Qibla() {
  const [bearing, setBearing] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    navigator.geolocation?.getCurrentPosition(
      (pos) => setBearing(getQiblaBearing(pos.coords.latitude, pos.coords.longitude)),
      () => setError("Please allow location access.")
    );
  }, []);

  return (
    <div className="container-x section-y">
      <h1 className="mb-6 text-3xl font-bold">Qibla Direction</h1>
      <div className="mx-auto max-w-xl rounded-3xl bg-white p-10 text-center shadow-xl ring-1 ring-slate-200">
        <div className="text-8xl">🧭</div>
        {bearing !== null ? (
          <>
            <p className="mt-6 text-lg text-slate-500">Qibla Bearing</p>
            <h2 className="mt-2 text-5xl font-bold text-emerald-700">{bearing}°</h2>
          </>
        ) : error ? (
          <p className="mt-6 text-rose-600">{error}</p>
        ) : (
          <p className="mt-6">Calculating...</p>
        )}
      </div>
    </div>
  );
}