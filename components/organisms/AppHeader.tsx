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
    if (!isSnap) style.push('bg-white');
    if (!isActiveHeader) style.push('h-[86px]');
    return style.join(' ');
  };

  return (
    <>
      <header
        className={`${headerBehavior()} z-50 fixed top-0 w-full py-5 duration-300 md:transition-none`}
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
              className="flex items-center w-80 h-12 mx-auto rounded-full pl-6 pr-2 bg-white cursor-pointer border border-gray-200 shadow-md hover:shadow-lg text-left"
              onClick={() => setIsActiveHeader(true)}
            >
              <span className="flex-grow text-sm text-gray-500 font-medium tracking-wide">
                Start your search
              </span>
              <SearchIcon className="h-8 p-2 rounded-full text-white bg-primary" />
            </button>
          </div>
          <div className="relative order-last xl:order-none col-span-2 xl:col-span-1 flex flex-col justify-center items-center">
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
          <div className="z-50 flex justify-end items-center">
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
            <button className="flex items-center h-11 bg-white pr-1 pl-3 rounded-full border border-gray-200 hover:shadow-md">
              <MenuIcon className="h-5 text-gray-300 mr-2" />
              <UserCircleIconSolid className="h-10 text-gray-300" />
            </button>
          </div>
        </div>
        {/* big search bar */}
        <div className="px-3 hidden md:block">
          <AppSearch menu={menu} isActiveHeader={isActiveHeader} />
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
      {isActiveHeader && !isSnap ? (
        <div
          className="fixed inset-0 bg-transparent-black z-40"
          onClick={() => setIsActiveHeader(false)}
        />
      ) : null}
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
