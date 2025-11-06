"use client";

interface SupportProps {
  tickets: any[];
}

export default function Support({ tickets }: SupportProps) {
  return (
    <div className="space-y-3">
      {tickets.map(t => (
        <div key={t.id} className="border rounded-lg p-3 flex justify-between">
          <div>
            <p>{t.subject}</p>
            <p>{t.date}</p>
          </div>
          <span className={`px-2 py-1 rounded-full ${t.status === "مفتوح" ? "bg-green-100 text-green-700" : "bg-gray-200 text-gray-700"}`}>
            {t.status}
          </span>
        </div>
      ))}
    </div>
  );
}
