import React, { useEffect, useState } from 'react';
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
  const [isSnap, setIsSnap] = useState<boolean>(true);
  const [isActiveHeader, setIsActiveHeader] = useState<boolean>(true);
  const [menu, setMenu] = useState<EAppHeaderSelectedMenu | null>(
    EAppHeaderSelectedMenu.PLACES_TO_STAY
  );

  const handleOnScroll = () => {
    const position = window.pageYOffset;
    if (position >= 50) {
      setIsSnap(false);
      setIsActiveHeader(false);
    } else {
      setIsSnap(true);
      setIsActiveHeader(true);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleOnScroll);
    return () => window.removeEventListener('scroll', handleOnScroll);
  }, []);

  const headerBehavior = () => {
    let style = [];
    if (!isSnap) style.push('bg-white shadow-lg border-opacity-100');
    if (!isActiveHeader) style.push('h-[86px]');
    return style.join(' ');
  };

  return (
    <>
      <header
        className={`${headerBehavior()} z-50 border-b border-gray-200 fixed top-0 w-full py-5 duration-300 md:transition-none`}
      >
        <div className="container hidden md:grid grid-cols-[auto,1fr,auto] xl:grid-cols-[1.5fr,3fr,1.5fr] 2xl:grid-cols-[1fr,3fr,1fr] gap-y-5 items-start">
          {/* left side - logo */}
          <div className="z-50 flex items-center h-12">
            <Link href="/">
              <a>
                <AppLogo
                  className={`${isSnap ? 'text-white' : 'text-primary'} hidden xl:block`}
                  type={EAppLogo.TEXT}
                />
                <AppLogo
                  className={`${isSnap ? 'text-white' : 'text-primary'} block xl:hidden`}
                  type={EAppLogo.LOGO}
                />
              </a>
            </Link>
          </div>
          {/* small search */}
          <div
            className={`${
              isActiveHeader
                ? 'scale-[1.33] translate-y-[75px] opacity-0 z-[-50]'
                : 'z-[60]'
            } relative md:absolute left-24 lg:left-0 lg:right-0 transform duration-300 `}
          >
            <button
              className="flex items-center h-12 pl-6 pr-2 mx-auto text-left bg-white border border-gray-200 rounded-full shadow-md cursor-pointer w-80 hover:shadow-lg"
              onClick={() => setIsActiveHeader(true)}
            >
              <span className="flex-grow text-sm font-medium tracking-wide text-gray-500">
                Start your search
              </span>
              <SearchIcon className="h-8 p-2 text-white rounded-full bg-primary" />
            </button>
          </div>
          <div className="relative flex flex-col items-center justify-center order-last col-span-2 xl:order-none xl:col-span-1">
            {/* middle side */}
            <div className="text-white">
              <AppHeaderMenuItem
                isSnap={isSnap}
                isActiveHeader={isActiveHeader}
                active={menu === EAppHeaderSelectedMenu.PLACES_TO_STAY}
                onClick={() => setMenu(EAppHeaderSelectedMenu.PLACES_TO_STAY)}
              >
                Places to stay
              </AppHeaderMenuItem>
              <AppHeaderMenuItem
                isSnap={isSnap}
                isActiveHeader={isActiveHeader}
                active={menu === EAppHeaderSelectedMenu.EXPERIENCES}
                onClick={() => setMenu(EAppHeaderSelectedMenu.EXPERIENCES)}
              >
                Experiences
              </AppHeaderMenuItem>
              <AppHeaderMenuItem isSnap={isSnap} isActiveHeader={isActiveHeader}>
                <Link href="#">
                  <a>Online Experiences</a>
                </Link>
              </AppHeaderMenuItem>
            </div>
          </div>
          {/* right side - menu */}
          <div className="z-50 flex items-center justify-end">
            <Link href="#">
              <a
                className={`${
                  isSnap
                    ? 'text-white hover:bg-white hover:bg-opacity-10'
                    : 'text-gray-500 hover:bg-gray-100 '
                } flex items-center h-10 px-4 rounded-full font-medium tracking-wide text-sm`}
              >
                Become a host
              </a>
            </Link>
            <Link href="#">
              <a
                className={`${
                  isSnap
                    ? 'text-white hover:bg-white hover:bg-opacity-10'
                    : 'text-gray-500 hover:bg-gray-100 '
                } flex items-center h-10 px-3 mr-1 rounded-full `}
              >
                <GlobeAltIcon className="h-5" />
              </a>
            </Link>
            <button className="flex items-center pl-3 pr-1 bg-white border border-gray-200 rounded-full h-11 hover:shadow-md">
              <MenuIcon className="h-5 mr-2 text-gray-300" />
              <UserCircleIconSolid className="h-10 text-gray-300" />
            </button>
          </div>
        </div>
        {/* big search bar */}
        <div className="hidden px-3 md:block">
          <AppSearch menu={menu} isActiveHeader={isActiveHeader} />
        </div>
        {/* mobile search bar */}
        <div className="container block md:hidden">
          <div className="flex items-center justify-center h-12 bg-gray-100 rounded-full">
            <SearchIcon className="h-5 mr-1 text-primary" />
            <span className="text-sm font-medium tracking-wide">
              Where are you going?
            </span>
          </div>
        </div>
      </header>
      {isActiveHeader && !isSnap ? (
        <div
          className="fixed inset-0 z-40 bg-transparent-black"
          onClick={() => setIsActiveHeader(false)}
        />
      ) : null}
      <div className="fixed bottom-0 z-50 w-full h-16 bg-white border-t border-gray-200 md:hidden">
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
