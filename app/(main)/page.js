import Hero from "@/components/ui/Hero";
import Image from "next/image";
import { Star } from "lucide-react";
import FAQ from "@/components/ui/FAQ";

export default function Home() {
  return (
    <div className="mx-auto flex max-w-6xl flex-col items-center justify-between px-4 pb-4 pt-4 md:px-8">
      <Hero />
      <div className="relative mt-20 h-[800px] w-full">
        <Image
          src="/example.png"
          className="rounded-xl border border-neutral-200 object-cover"
          alt="chart"
          fill
        />
      </div>
      <div className="mt-40">
        <div className="flex items-center justify-center gap-x-0.5">
          <Star fill="currentColor" className="size-6 text-amber-600" />
          <Star fill="currentColor" className="size-6 text-amber-600" />
          <Star fill="currentColor" className="size-6 text-amber-600" />
          <Star fill="currentColor" className="size-6 text-amber-600" />
          <Star fill="currentColor" className="size-6 text-amber-600" />
        </div>
        <div className="mt-10 flex flex-col items-center gap-x-2">
          <h2 className="mb-6 text-lg">Yes, it works for me.</h2>
          <div className="flex items-center gap-x-2">
            <Image
              src="/timakaa.png"
              alt="logo"
              className="size-14 rounded-full object-cover"
              width={52}
              height={52}
            />
            <div className="flex flex-col justify-between">
              <span>Timakaa</span>
              <a
                target="_blank"
                href="https://timakaa-portfolio.vercel.app/"
                className="text-neutral-500"
              >
                timakaa-portfolio
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="mx-auto my-40 w-screen max-w-xl">
        <h2 className="mb-2 text-3xl font-bold">FAQ</h2>
        <FAQ />
      </div>
    </div>
  );
}
