import { getCategories, getNotes } from "@/lib/db/queries";

export default function NotesPage() {
  return (
    <main className="flex">
      <Categories />
      <Notes />
    </main>
  );
}

async function Categories() {
  const categories = await getCategories();

  return (
    <section>
      <h1>Categories</h1>
      <ul>
        {categories.map((category) => (
          <li key={category.id}>
            <h2>{category.name}</h2>
          </li>
        ))}
      </ul>
    </section>
  );
}

async function Notes() {
  const notes = await getNotes();

  return (
    <div>
      <h1>Notes</h1>
      <ul>
        {notes.map((note) => (
          <li key={note.id}>
            <h2>{note.title}</h2>
            <p>{note.content}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
