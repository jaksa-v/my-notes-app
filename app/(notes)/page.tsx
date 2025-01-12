import { getCategories, getNotes } from "@/lib/db/queries";
import { FolderIcon, FileTextIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";

export default function NotesPage() {
  return (
    <main className="flex h-screen">
      <Categories />
      <Notes />
    </main>
  );
}

async function Categories() {
  const categories = await getCategories();

  return (
    <section className="w-64 min-w-64 p-6 border-r">
      <h1 className="flex items-center gap-2 text-lg font-semibold mb-4">
        <FolderIcon className="w-5 h-5" />
        Categories
      </h1>
      <ul className="space-y-2">
        {categories.map((category) => (
          <li key={category.id}>
            <Link
              // TODO: convert to button
              // href={`/categories/${category.id}`}
              href="/"
              className="block p-2 rounded-lg hover:bg-slate-100 transition-colors"
              prefetch={true}
            >
              <h2 className="font-medium text-sm text-slate-700">
                {category.name}
              </h2>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}

async function Notes() {
  const notes = await getNotes();

  return (
    <div className="flex-1 p-6 bg-slate-50">
      <h1 className="flex items-center gap-2 text-lg font-semibold mb-6">
        <FileTextIcon className="w-5 h-5" />
        Notes
      </h1>
      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {notes.map((note) => (
          <li key={note.id}>
            <Link
              href={`/notes/${note.id}`}
              className={cn(
                "block p-4 rounded-lg bg-white shadow-sm border",
                "hover:shadow-md transition-shadow"
              )}
              prefetch={true}
            >
              <h2 className="font-medium mb-2">{note.title}</h2>
              <p className="text-sm text-slate-600 line-clamp-3">
                {note.content}
              </p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
