import { getEducation } from '@/lib/content/education';

export default async function EducationPage() {
  const items = await getEducation();
  return (
    <main className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-semibold mb-6">Education</h1>
      <div className="space-y-4">
        {items.map(e => (
          <div key={e.id} className="rounded-xl border bg-white/50 p-4">
            <h2 className="text-lg font-medium">{e.degree}</h2>
            <p className="text-gray-700">{e.institution}</p>
            <p className="text-gray-600 text-sm">{e.startYear} - {e.endYear} {e.gpa ? `• ${e.gpa}` : ''}</p>
            {e.details?.length ? (
              <ul className="list-disc ml-5 text-sm text-gray-700 mt-2 space-y-1">
                {e.details.map(d => <li key={d}>{d}</li>)}
              </ul>
            ) : null}
          </div>
        ))}
      </div>
    </main>
  );
}

