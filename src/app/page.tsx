
import React from "react";
import Image from 'next/image'


export default function Home() {
  return (
    <div className="items-center justify-items-center min-h-screen p-8 pb-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start w-full">
        <h1 className="font-bold">Notre catalogue</h1>
        <Image src="/catalogue.jpg" alt="catalogue" width={500} height={500} />
      </main>
    </div>
  );
}
