export default function PrayerCard() {
  const prayerTimes = [
    ["Fajr", "04:52 AM"],
    ["Dhuhr", "12:16 PM"],
    ["Asr", "03:43 PM"],
    ["Maghrib", "06:18 PM"],
    ["Isha", "07:39 PM"],
  ];

  return (
    <div className="rounded-[2rem] bg-white p-6 shadow-lg ring-1 ring-slate-200">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <p className="text-sm text-slate-500">Today in Makkah</p>
          <h3 className="text-xl font-bold">Prayer Times</h3>
        </div>
        <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700">
          Next: Dhuhr
        </span>
      </div>
      <div className="space-y-3">
        {prayerTimes.map(([name, time]) => (
          <div key={name} className="flex items-center justify-between rounded-2xl bg-slate-50 px-4 py-3">
            <span className="font-medium">{name}</span>
            <span className="font-semibold text-emerald-700">{time}</span>
          </div>
        ))}
      </div>
    </div>
  );
}