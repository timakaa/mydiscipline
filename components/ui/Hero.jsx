import getSession from "@/lib/getSession";
import CheckIcon from "./CheckIcon";
import Link from "next/link";

const Hero = async () => {
  const session = await getSession();

  return (
    <div className="mt-20 grid place-items-center">
      <div>
        <h1 className="text-center text-3xl font-bold md:text-6xl">
          <span className="inline animate-gradient bg-gradient-to-r from-amber-500 via-amber-600 to-amber-700 bg-300% bg-clip-text font-bold text-transparent selection:bg-amber-100 selection:text-amber-600">
            Be honest
          </span>{" "}
          with yourself
        </h1>
        <div className="mx-auto max-w-sm">
          <h2 className="mt-4 text-base font-semibold md:mt-10 md:text-xl">
            Simple tool to help you stay on track with your goals.
          </h2>
          <ul className="mt-4 space-y-1">
            <li className="flex items-center gap-x-3 text-base md:text-lg">
              <span className="text-amber-600">
                <CheckIcon />
              </span>
              <span className="text-neutral-500">Watch you grow</span>
            </li>
            <li className="flex items-center gap-x-3 text-base md:text-lg">
              <span className="text-amber-600">
                <CheckIcon />
              </span>
              <span className="text-neutral-500">
                Get a clear picture of your habits and goals
              </span>
            </li>
            <li className="flex items-center gap-x-3 text-base md:text-lg">
              <span className="text-amber-600">
                <CheckIcon />
              </span>
              <span className="text-neutral-500">Visualization</span>
            </li>
          </ul>
        </div>
        <div className="flex justify-center">
          <Link
            href={session?.user ? "/discipline" : "/api/auth/signin"}
            className="btn btn-primary mt-10 w-full max-w-lg py-2 text-sm font-medium tracking-wide md:text-lg"
          >
            Do your duty without excuses
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Hero;
