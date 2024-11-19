import Link from "next/link";
import { InfiniteLogo } from "./ui/InfiniteLogo";
import UserMenu from "./UserMenu";
import SwitchTheme from "./ui/SwitchTheme";

const Header = () => {
  return (
    <div className='border-b border-base-content/10'>
      <header className='mx-auto max-w-6xl flex justify-between items-center pt-4 pb-4 px-4 md:px-8'>
        <div>
          <Link
            href='/'
            className='flex gap-x-1 text-[1.25rem] font-[700] items-center select-none'
          >
            <InfiniteLogo className='text-amber-600 text-2xl' />
            <div>MyDiscipline</div>
          </Link>
        </div>
        <div>
          <div className='flex gap-x-2'>
            <SwitchTheme />
            <UserMenu />
          </div>
        </div>
      </header>
    </div>
  );
};

export default Header;
