import React, { useEffect, useState } from 'react';
import Link from 'next/link';
// components
import AppLogo, { EAppLogo } from '@/components/atoms/AppLogo';
import AppSearch from '@/components/molecules/AppSearch';
import AppHeaderMenuItem from '@/components/atoms/AppHeaderMenuItem';
import AppSearchMobile from '@/components/molecules/AppSearchMobile';
// icons
import { GlobeAltIcon, MenuIcon, SearchIcon } from '@heroicons/react/outline';
import { UserCircleIcon } from '@heroicons/react/solid';

export enum EAppHeaderSelectedMenu {
  PLACES_TO_STAY = 'placesToStay',
  EXPERIENCES = 'experiences',
}

const AppHeader = ({ exploreNearby }) => {
  const [isSnapTop, setIsSnapTop] = useState<boolean>(true);
  const [isActiveSearch, setIsActiveSearch] = useState<boolean>(true);
  const [activeMenu, setActiveMenu] = useState<EAppHeaderSelectedMenu | null>(
    EAppHeaderSelectedMenu.PLACES_TO_STAY
  );

  const handleOnScroll = () => {
    const position = window.pageYOffset;
    if (position >= 50) {
      setIsSnapTop(false);
      setIsActiveSearch(false);
    } else {
      setIsSnapTop(true);
      setIsActiveSearch(true);
    }
  };

  const headerBehavior = () => {
    let style = [];
    if (!isSnapTop) style.push('bg-white shadow-lg');
    if (!isActiveSearch) style.push('h-[86px]');
    return style.join(' ');
  };

  useEffect(() => {
    // listen to scroll
    window.addEventListener('scroll', handleOnScroll);
    return () => window.removeEventListener('scroll', handleOnScroll);
  }, []);

  return (
    <>
      <header
        className={`${headerBehavior()} z-50 fixed top-0 w-full py-5 duration-300 md:transition-none`}
      >
        {/* header top */}
        <div className="container hidden md:grid md:grid-cols-[auto,1fr,auto] xl:grid-cols-[1.5fr,3fr,1.5fr] 2xl:grid-cols-[1fr,3fr,1fr] items-start">
          {/* left side - logo */}
          <div className="flex items-center h-12">
            <Link href="/">
              <a>
                <AppLogo
                  className={`${
                    isSnapTop ? 'text-white' : 'text-primary'
                  } hidden xl:block`}
                  type={EAppLogo.TEXT}
                />
                <AppLogo
                  className={`${
                    isSnapTop ? 'text-white' : 'text-primary'
                  } block xl:hidden`}
                  type={EAppLogo.LOGO}
                />
              </a>
            </Link>
          </div>
          {/* small search bar */}
          <button
            className={`${
              isActiveSearch && 'scale-[1.33] translate-y-[75px] opacity-0 z-[-50]'
            } relative flex items-center h-12 pl-6 pr-2 mx-auto text-left transform bg-white border border-gray-200 rounded-full shadow-md cursor-pointer w-80 hover:shadow-lg md:absolute left-24 lg:left-0 lg:right-0 duration-200`}
            onClick={() => setIsActiveSearch(true)}
          >
            <span className="flex-grow text-sm font-medium tracking-wide text-gray-500">
              Start your search
            </span>
            <SearchIcon className="h-8 p-2 text-white rounded-full bg-primary" />
          </button>
          {/* middle side navigation */}
          <div className="relative flex flex-col items-center justify-center order-last col-span-2 xl:order-none xl:col-span-1">
            <div className="text-white">
              <AppHeaderMenuItem
                isSnap={isSnapTop}
                isActiveHeader={isActiveSearch}
                active={activeMenu === EAppHeaderSelectedMenu.PLACES_TO_STAY}
                onClick={() => setActiveMenu(EAppHeaderSelectedMenu.PLACES_TO_STAY)}
              >
                Places to stay
              </AppHeaderMenuItem>
              <AppHeaderMenuItem
                isSnap={isSnapTop}
                isActiveHeader={isActiveSearch}
                active={activeMenu === EAppHeaderSelectedMenu.EXPERIENCES}
                onClick={() => setActiveMenu(EAppHeaderSelectedMenu.EXPERIENCES)}
              >
                Experiences
              </AppHeaderMenuItem>
              <AppHeaderMenuItem isSnap={isSnapTop} isActiveHeader={isActiveSearch}>
                <Link href="#">
                  <a>Online Experiences</a>
                </Link>
              </AppHeaderMenuItem>
            </div>
          </div>
          {/* right side */}
          <div className="flex items-center justify-end">
            <Link href="#">
              <a
                className={`${
                  isSnapTop
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
                  isSnapTop
                    ? 'text-white hover:bg-white hover:bg-opacity-10'
                    : 'text-gray-500 hover:bg-gray-100 '
                } flex items-center h-10 px-3 mr-1 rounded-full `}
              >
                <GlobeAltIcon className="h-5" />
              </a>
            </Link>
            <button className="flex items-center pl-3 pr-1 bg-white border border-gray-200 rounded-full h-11 hover:shadow-md">
              <MenuIcon className="h-5 mr-2 text-gray-300" />
              <UserCircleIcon className="h-10 text-gray-300" />
            </button>
          </div>
        </div>
        {/* main search bar */}
        <AppSearch menu={activeMenu} isActiveHeader={isActiveSearch} />
        {/* mobile search bar */}
        <AppSearchMobile exploreNearby={exploreNearby} />
      </header>
      {/* background layer */}
      {isActiveSearch && !isSnapTop && (
        <div
          className="fixed inset-0 z-40 bg-transparent-black"
          onClick={() => setIsActiveSearch(false)}
        />
      )}
    </>
  );
};

export default AppHeader;
