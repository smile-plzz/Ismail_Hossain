import Link from 'next/link';
import { getVentures } from '@/lib/content/ventures';

export default async function VenturesPage() {
  const ventures = await getVentures();
  return (
    <main className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-semibold mb-6">Entrepreneurial Ventures</h1>
      <div className="space-y-4">
        {ventures.map(v => (
          <div key={v.id} className="rounded-xl border bg-white/50 p-4">
            <h2 className="text-lg font-medium">{v.name}</h2>
            <p className="text-gray-700">{v.role}</p>
            <p className="text-gray-600 text-sm">{v.start} - {v.end || 'Present'}</p>
            {v.bullets?.length ? (
              <ul className="list-disc ml-5 text-sm text-gray-700 mt-2 space-y-1">
                {v.bullets.map(b => <li key={b}>{b}</li>)}
              </ul>
            ) : null}
            {v.links?.length ? (
              <div className="flex gap-3 mt-2 text-sm">
                {v.links.map(url => (
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

