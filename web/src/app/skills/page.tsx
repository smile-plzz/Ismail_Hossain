import { getSkills } from '@/lib/content/skills';

export default async function SkillsPage() {
  const groups = await getSkills();
  return (
    <main className="max-w-5xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-semibold mb-6">Skills</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {groups.map(g => (
          <div key={g.id} className="rounded-xl border bg-white/50 p-4">
            <h2 className="font-medium mb-2">{g.category}</h2>
            <ul className="list-disc ml-5 text-sm text-gray-700 space-y-1">
              {g.items.map((item) => (<li key={item}>{item}</li>))}
            </ul>
          </div>
        ))}
      </div>
    </main>
  );
}

