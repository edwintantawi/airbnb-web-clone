import React, { useEffect, useState } from 'react';
import Link from 'next/link';
// components
import AppLogo, { EAppLogo } from '@/components/atoms/AppLogo';
import AppSearch from '@/components/molecules/AppSearch';
import AppHeaderMenuItem from '@/components/atoms/AppHeaderMenuItem';
import AppSearchMobile from '@/components/molecules/AppSearchMobile';
import AppMobileNavigation from '@/components/atoms/AppMobileNavigation';
// icons
import { GlobeAltIcon, MenuIcon, SearchIcon } from '@heroicons/react/outline';
import { UserCircleIcon } from '@heroicons/react/solid';

export enum EAppHeaderSelectedMenu {
  PLACES_TO_STAY = 'placesToStay',
  EXPERIENCES = 'experiences',
}

const AppHeader = ({ exploreNearby }) => {
  const [isSnap, setIsSnap] = useState<boolean>(true);
  const [isActiveHeader, setIsActiveHeader] = useState<boolean>(true);
  const [menu, setMenu] = useState<EAppHeaderSelectedMenu | null>(
    EAppHeaderSelectedMenu.PLACES_TO_STAY
  );
  const [isMobileNavActive, setIsMobileNavActive] = useState<boolean>(false);

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
    if (!isSnap) style.push('bg-white shadow-lg');
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
          <button
            className={`${
              isActiveHeader
                ? 'scale-[1.33] translate-y-[75px] opacity-0 z-[-50]'
                : 'z-50'
            } relative z-50 flex items-center h-12 pl-6 pr-2 mx-auto text-left transform bg-white border border-gray-200 rounded-full shadow-md cursor-pointer w-80 hover:shadow-lg md:absolute left-24 lg:left-0 lg:right-0`}
            onClick={() => setIsActiveHeader(true)}
          >
            <span className="flex-grow text-sm font-medium tracking-wide text-gray-500">
              Start your search
            </span>
            <SearchIcon className="h-8 p-2 text-white rounded-full bg-primary" />
          </button>
          {/* middle side */}
          <div className="relative flex flex-col items-center justify-center order-last col-span-2 xl:order-none xl:col-span-1">
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
          <div className="z-40 flex items-center justify-end">
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
              <UserCircleIcon className="h-10 text-gray-300" />
            </button>
          </div>
        </div>
        {/* big search bar */}
        <div className={`${isActiveHeader ? 'visible' : 'invisible'} px-4`}>
          <AppSearch menu={menu} isActiveHeader={isActiveHeader} />
        </div>
        {/* mobile search bar */}
        <button
          className="container block w-full md:hidden"
          onClick={() => setIsMobileNavActive(true)}
        >
          <div className="flex items-center justify-center h-12 bg-gray-100 rounded-full">
            <SearchIcon className="h-5 mr-1 text-primary" />
            <span className="text-sm font-medium tracking-wide">
              Where are you going?
            </span>
          </div>
        </button>
      </header>
      {isActiveHeader && !isSnap ? (
        <div
          className="fixed inset-0 z-40 bg-transparent-black"
          onClick={() => setIsActiveHeader(false)}
        />
      ) : null}

      {/* bottom navigation */}
      <AppMobileNavigation />

      {/* mobile search */}
      <AppSearchMobile
        exploreNearby={exploreNearby}
        active={isMobileNavActive}
        onClose={() => setIsMobileNavActive(false)}
      />
    </>
  );
};

export default AppHeader;
