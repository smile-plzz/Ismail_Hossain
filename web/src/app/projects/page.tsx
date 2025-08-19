import Image from 'next/image';
import Link from 'next/link';
import { getProjects } from '@/lib/content/projects';

export const revalidate = 60; // ISR

export default async function ProjectsPage() {
  const projects = await getProjects();
  return (
    <main className="max-w-6xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-semibold mb-8">Projects</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((p) => (
          <div key={p.id} className="rounded-xl border bg-white/50 p-4">
            {p.coverUrl && (
              <div className="mb-3 relative w-full aspect-video overflow-hidden rounded-lg">
                <Image src={p.coverUrl} alt={p.title} fill className="object-cover"/>
              </div>
            )}
            <h2 className="text-lg font-medium mb-2">{p.title}</h2>
            {p.description && <p className="text-sm text-gray-600 mb-3">{p.description}</p>}
            <div className="flex flex-wrap gap-2 mb-3">
              {p.tags?.map((t) => (
                <span key={t} className="text-xs px-2 py-1 rounded-full bg-blue-100 text-blue-700">{t}</span>
              ))}
            </div>
            <div className="flex gap-3 text-sm">
              {p.demoUrl && <Link href={p.demoUrl} target="_blank" className="text-blue-600 hover:underline">Demo</Link>}
              {p.repoUrl && <Link href={p.repoUrl} target="_blank" className="text-gray-700 hover:underline">Code</Link>}
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}

