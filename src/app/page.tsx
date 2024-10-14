
import Header from "../components/Header";

export default function Home() {
  return (
    <div className="items-center justify-items-center min-h-screen p-8 pb-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start bg-yellow-300 w-full">
        <Header />
        <h1>Accueil</h1>
      </main>
    </div>
  );
}
