import { getNote } from "@/lib/db/queries";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function NotePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const note = await getNote(id);

  if (!note) {
    notFound();
  }

  return (
    <main className="max-w-2xl mx-auto p-6">
      <Link
        href="/"
        className="inline-flex items-center gap-2 text-sm text-slate-600 hover:text-slate-900 mb-8"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Notes
      </Link>

      <article className="space-y-8">
        <header>
          <h1 className="text-3xl font-bold">{note.title}</h1>
          <time className="text-sm text-slate-500 mt-2 block">
            {new Date(note.createdAt).toLocaleDateString()}
          </time>
        </header>

        <div className="prose prose-slate">
          <p className="whitespace-pre-wrap">{note.content}</p>
        </div>
      </article>
    </main>
  );
}
