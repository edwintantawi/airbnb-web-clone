import React, { useState } from 'react';
import Link from 'next/link';
// components
import AppLogo, { EAppLogo } from '@/components/atoms/AppLogo';
import AppSearch from '@/components/molecules/AppSearch';
import AppHeaderMenuItem from '@/components/atoms/AppHeaderMenuItem';
// icons
import {
  GlobeAltIcon,
  MenuIcon,
  SearchIcon,
  HeartIcon,
  UserCircleIcon,
} from '@heroicons/react/outline';
import { UserCircleIcon as UserCircleIconSolid } from '@heroicons/react/solid';

export enum EAppHeaderSelectedMenu {
  PLACES_TO_STAY = 'placesToStay',
  EXPERIENCES = 'experiences',
}

const AppHeader = () => {
  const [menu, setMenu] = useState<EAppHeaderSelectedMenu | null>(
    EAppHeaderSelectedMenu.PLACES_TO_STAY
  );

  return (
    <>
      <header className="z-50 fixed top-0 w-full py-5">
        <div className="container hidden md:grid grid-cols-[1fr,auto] xl:grid-cols-[1.5fr,3fr,1.5fr] 2xl:grid-cols-[1fr,3fr,1fr] gap-y-5 items-start">
          {/* left side - logo */}
          <div className="flex items-center">
            <Link href="/">
              <a>
                <AppLogo className="text-white hidden xl:block" type={EAppLogo.TEXT} />
                <AppLogo className="text-white block xl:hidden" type={EAppLogo.LOGO} />
              </a>
            </Link>
          </div>
          {/* middle side - search */}
          <div className="order-last xl:order-none col-span-2 xl:col-span-1 flex flex-col justify-center items-center">
            {/* middle side */}
            <div className="text-white">
              <AppHeaderMenuItem
                active={menu === EAppHeaderSelectedMenu.PLACES_TO_STAY}
                onClick={() => setMenu(EAppHeaderSelectedMenu.PLACES_TO_STAY)}
              >
                Places to stay
              </AppHeaderMenuItem>
              <AppHeaderMenuItem
                active={menu === EAppHeaderSelectedMenu.EXPERIENCES}
                onClick={() => setMenu(EAppHeaderSelectedMenu.EXPERIENCES)}
              >
                Experiences
              </AppHeaderMenuItem>
              <AppHeaderMenuItem>
                <Link href="#">
                  <a>Online Experiences</a>
                </Link>
              </AppHeaderMenuItem>
            </div>
          </div>
          {/* right side - menu */}
          <div className="flex justify-end items-center">
            <Link href="#">
              <a className="flex items-center h-10 px-4 rounded-full font-medium tracking-wide text-sm text-white hover:bg-white hover:bg-opacity-10">
                Become a host
              </a>
            </Link>
            <Link href="#">
              <a className="flex items-center h-10 px-3 mr-1 rounded-full hover:bg-white hover:bg-opacity-10">
                <GlobeAltIcon className="h-5 text-white" />
              </a>
            </Link>
            <button className="flex items-center h-11 bg-white pr-1 pl-3 rounded-full border border-gray-200 hover:shadow-md">
              <MenuIcon className="h-5 text-gray-300 mr-2" />
              <UserCircleIconSolid className="h-10 text-gray-300" />
            </button>
          </div>
        </div>
        {/* search bar */}
        <div className="px-3 hidden md:block">
          <AppSearch menu={menu} />
        </div>
        {/* mobile search bar */}
        <div className="container block md:hidden">
          <div className="flex items-center justify-center h-12 bg-gray-100 rounded-full">
            <SearchIcon className="h-5 mr-1 text-primary" />
            <span className="font-medium text-sm tracking-wide">
              Where are you going?
            </span>
          </div>
        </div>
      </header>

      <div className="fixed z-50 bottom-0 md:hidden w-full h-16 border-t border-gray-200 bg-white">
        <div className="grid grid-cols-3 items-center h-full max-w-[250px] sm:max-w-[350px] mx-auto">
          <div className="flex flex-col items-center px-3">
            <SearchIcon className="h-6 mr-1 text-primary" />
            <span className="mt-1 text-xs text-gray-500">Explore</span>
          </div>
          <div className="flex flex-col items-center px-3">
            <HeartIcon className="h-6 mr-1 text-gray-300 text-opacity-50" />
            <span className="mt-1 text-xs text-gray-500">Explore</span>
          </div>
          <div className="flex flex-col items-center px-3">
            <UserCircleIcon className="h-6 mr-1 text-gray-300 text-opacity-50" />
            <span className="mt-1 text-xs text-gray-500">Explore</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default AppHeader;
