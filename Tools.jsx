import { useEffect, useMemo, useState } from "react";

export default function Tools() {
  const [times, setTimes] = useState(null);
  const [amount, setAmount] = useState("100");
  const [fromCurrency, setFromCurrency] = useState("USD");

  const currencyRatesToSAR = {
    USD: 3.75,
    EUR: 4.1,
    GBP: 4.8,
    BDT: 0.032,
    INR: 0.045,
    PKR: 0.013,
    AED: 1.02,
    TRY: 0.12,
    MYR: 0.8,
    IDR: 0.00024,
    QAR: 1.03,
    KWD: 12.1,
    OMR: 9.74,
    EGP: 0.076,
    SAR: 1,
  };

  useEffect(() => {
    fetch("http://localhost:5000/api/prayer-times")
      .then((res) => res.json())
      .then((data) => setTimes(data?.data?.timings || null));
  }, []);

  const converted = useMemo(() => {
    const num = Number(amount || 0);
    const rate = currencyRatesToSAR[fromCurrency] || 1;
    return (num * rate).toFixed(2);
  }, [amount, fromCurrency]);

  return (
    <div className="container-x section-y">
      <h1 className="mb-6 text-3xl font-bold">Tools</h1>

      <div className="grid gap-8 lg:grid-cols-2">
        <div className="rounded-2xl bg-white p-6 shadow ring-1 ring-slate-200">
          <h2 className="mb-4 text-xl font-bold">Prayer Times</h2>
          {times ? (
            Object.entries({
              Fajr: times.Fajr,
              Dhuhr: times.Dhuhr,
              Asr: times.Asr,
              Maghrib: times.Maghrib,
              Isha: times.Isha,
            }).map(([key, val]) => (
              <div key={key} className="border-b py-3 last:border-b-0">
                {key}: <span className="font-semibold text-emerald-700">{val}</span>
              </div>
            ))
          ) : (
            <p>Loading...</p>
          )}
        </div>

        <div className="rounded-2xl bg-white p-6 shadow ring-1 ring-slate-200">
          <h2 className="mb-4 text-xl font-bold">Currency Converter to SAR</h2>

          <div className="grid gap-4">
            <input
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full rounded-xl border px-4 py-3"
              placeholder="Enter amount"
            />

            <select
              value={fromCurrency}
              onChange={(e) => setFromCurrency(e.target.value)}
              className="w-full rounded-xl border px-4 py-3"
            >
              {Object.keys(currencyRatesToSAR).map((currency) => (
                <option key={currency} value={currency}>
                  {currency} → SAR
                </option>
              ))}
            </select>

            <div className="rounded-2xl bg-emerald-50 p-5">
              <p className="text-sm text-slate-600">Converted Amount</p>
              <div className="mt-2 text-3xl font-bold text-emerald-700">
                {converted} SAR
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}