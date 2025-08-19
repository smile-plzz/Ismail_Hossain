import Image from 'next/image';
import { getAbout } from '@/lib/content/about';

export default async function AboutPage() {
  const about = await getAbout();
  return (
    <main className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-semibold mb-6">About</h1>
      {about?.avatarUrl && (
        <div className="w-32 h-32 relative mb-4">
          <Image src={about.avatarUrl} alt="Avatar" fill className="rounded-full object-cover" />
        </div>
      )}
      {about?.headline && <p className="text-lg mb-4">{about.headline}</p>}
      {about?.location && <p className="text-gray-600">{about.location}</p>}
      {about?.email && <p className="text-gray-600">{about.email}</p>}
      {about?.phone && <p className="text-gray-600">{about.phone}</p>}
    </main>
  );
}

