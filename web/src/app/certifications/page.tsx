import Link from 'next/link';
import { getCertifications } from '@/lib/content/certifications';

export default async function CertificationsPage() {
  const items = await getCertifications();
  return (
    <main className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-semibold mb-6">Certifications</h1>
      <div className="space-y-4">
        {items.map(c => (
          <div key={c.id} className="rounded-xl border bg-white/50 p-4">
            <h2 className="text-lg font-medium">{c.title}</h2>
            <p className="text-gray-700">{c.issuer}</p>
            <p className="text-gray-600 text-sm">{c.date}</p>
            {c.url ? <Link href={c.url} className="text-blue-600 hover:underline" target="_blank">View</Link> : null}
          </div>
        ))}
      </div>
    </main>
  );
}

