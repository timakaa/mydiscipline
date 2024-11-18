import getSession from "@/app/lib/getSession";
import CheckIcon from "./CheckIcon";
import Link from "next/link";

const Hero = async () => {
  const session = await getSession();

  return (
    <div className='grid place-items-center mt-20'>
      <div>
        <h1 className='text-6xl font-bold block'>
          <span className='bg-gradient-to-r from-amber-600 to-amber-400 bg-clip-text text-transparent'>
            Be honest
          </span>{" "}
          with yourself
        </h1>
        <div className='mx-20'>
          <h2 className='text-xl mt-10 font-semibold'>
            Simple tool to help you stay on track with your goals.
          </h2>
          <ul className='mt-4 space-y-1'>
            <li className='flex items-center text-lg gap-x-3'>
              <span className='text-amber-600'>
                <CheckIcon />
              </span>
              <span className='text-neutral-500'>Watch you grow</span>
            </li>
            <li className='flex items-center text-lg gap-x-3'>
              <span className='text-amber-600'>
                <CheckIcon />
              </span>
              <span className='text-neutral-500'>
                Get a clear picture of your habits and goals
              </span>
            </li>
            <li className='flex items-center text-lg gap-x-3'>
              <span className='text-amber-600'>
                <CheckIcon />
              </span>
              <span className='text-neutral-500'>
                Create charts of your goals
              </span>
            </li>
            <li className='flex items-center text-lg gap-x-3'>
              <span className='text-amber-600'>
                <CheckIcon />
              </span>
              <span className='text-neutral-500'>Visualization</span>
            </li>
            <li className='flex items-center text-lg gap-x-3'>
              <span className='text-amber-600'>
                <CheckIcon />
              </span>
              <span className='text-neutral-500'>Pay with crypto</span>
            </li>
          </ul>
          <div className='flex justify-center'>
            <Link
              href={session?.user ? "/discipline" : "/api/auth/signin"}
              className='btn text-lg font-medium tracking-wide mt-10 py-2 px-20 btn-primary'
            >
              Do your duty without excuses
            </Link>
          </div>
          <div className='text-center text-neutral-500 mt-1 tracking-wide text-sm'>
            7-day free trial
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
