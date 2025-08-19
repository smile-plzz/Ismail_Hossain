import Link from 'next/link';
import { getExperience } from '@/lib/content/experience';

export default async function ExperiencePage() {
  const items = await getExperience();
  return (
    <main className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-semibold mb-6">Experience</h1>
      <div className="space-y-4">
        {items.map(x => (
          <div key={x.id} className="rounded-xl border bg-white/50 p-4">
            <h2 className="text-lg font-medium">{x.role}</h2>
            <p className="text-gray-700">{x.company}</p>
            <p className="text-gray-600 text-sm">{x.start} - {x.end || 'Present'}</p>
            {x.bullets?.length ? (
              <ul className="list-disc ml-5 text-sm text-gray-700 mt-2 space-y-1">
                {x.bullets.map(b => <li key={b}>{b}</li>)}
              </ul>
            ) : null}
            {x.links?.length ? (
              <div className="flex gap-3 mt-2 text-sm">
                {x.links.map(url => (
                  <Link key={url} href={url} target="_blank" className="text-blue-600 hover:underline">Link</Link>
                ))}
              </div>
            ) : null}
          </div>
        ))}
      </div>
    </main>
  );
}

