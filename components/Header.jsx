import Link from "next/link";
import { InfiniteLogo } from "./ui/InfiniteLogo";
import UserMenu from "./UserMenu";
import SwitchTheme from "./ui/SwitchTheme";

const Header = () => {
  return (
    <div className="border-b border-base-content/10">
      <header className="mx-auto flex max-w-6xl items-center justify-between px-4 pb-4 pt-4 md:px-8">
        <div>
          <Link
            href="/"
            className="flex select-none items-center gap-x-1 text-[1.25rem] font-[700]"
          >
            <InfiniteLogo className="text-2xl text-amber-600" />
            <div>MyDiscipline</div>
          </Link>
        </div>
        <div>
          <div className="flex gap-x-2">
            <SwitchTheme />
            <UserMenu />
          </div>
        </div>
      </header>
    </div>
  );
};

export default Header;
