export default function SectionTitle({ eyebrow, title, desc }) {
  return (
    <div className="mb-8">
      <p className="text-sm font-semibold uppercase tracking-[0.22em] text-emerald-700">
        {eyebrow}
      </p>
      <h2 className="mt-2 text-3xl font-bold text-slate-900 sm:text-4xl">{title}</h2>
      {desc ? <p className="mt-3 max-w-3xl text-slate-600">{desc}</p> : null}
    </div>
  );
}