import React, { useState } from 'react';
import Link from 'next/link';
import AppLogo, { EAppLogo } from '@/components/atoms/AppLogo';
import AppHeaderMenu from '@/components/atoms/AppHeaderMenu';
import { GlobeAltIcon, MenuIcon, SearchIcon, XIcon } from '@heroicons/react/outline';
import { UserCircleIcon } from '@heroicons/react/solid';

enum EAppHeaderMenu {
  PLACES_TO_STAY = 'placesToStay',
  EXPERIENCES = 'experiences',
}

enum EAppHeaderSearchMenu {
  LOCATION = 'location',
  CHECK_IN = 'checkIn',
  CHECK_OUT = 'checkOut',
  GUESTS = 'guests',
}

const AppHeader = () => {
  const [menu] = useState<EAppHeaderMenu | null>(EAppHeaderMenu.PLACES_TO_STAY);
  const [searchMenu, setSearchMenu] = useState<EAppHeaderSearchMenu | null>(null);
  // data
  const [location, setLocation] = useState<string>('');

  return (
    <header className="fixed top-0 w-full py-6 bg-primary">
      <div className="container grid grid-cols-3 items-start">
        {/* left side - logo */}
        <div className="flex items-center">
          <Link href="/">
            <a>
              <AppLogo className="text-white" type={EAppLogo.TEXT} />
            </a>
          </Link>
        </div>
        {/* middle side - search */}
        <div className="flex flex-col justify-center items-center">
          {/* middle side */}
          <div className="text-white">
            <AppHeaderMenu active={menu === EAppHeaderMenu.PLACES_TO_STAY}>
              Places to stay
            </AppHeaderMenu>
            <AppHeaderMenu active={menu === EAppHeaderMenu.EXPERIENCES}>
              Experiences
            </AppHeaderMenu>
            <AppHeaderMenu>Online Experiences</AppHeaderMenu>
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
            <UserCircleIcon className="h-10 text-gray-300" />
          </button>
        </div>
      </div>
      {/* big search */}
      <div className="flex items-stretch w-[850px] h-16 mx-auto mt-3 rounded-full bg-white border border-gray-200">
        <div
          className={`grid ${
            searchMenu
              ? 'grid-cols-[248px,163px,163px,auto]'
              : 'grid-cols-[270px,178px,178px,auto]'
          } flex-grow duration-300`}
        >
          {/* location */}
          <div
            className={`flex rounded-full hover:bg-gray-200 hover:focus-within:bg-white hover:bg-opacity-40 ${
              searchMenu === EAppHeaderSearchMenu.LOCATION && 'shadow-arround'
            } border-r-2`}
            onClick={() => setSearchMenu(EAppHeaderSearchMenu.LOCATION)}
          >
            <label
              className="flex flex-grow items-center pl-8 cursor-pointer"
              htmlFor="location"
            >
              <div className="flex flex-col justify-center mr-3 ">
                <span className="font-bold text-xs text-gray-500 tracking-wide">
                  Location
                </span>
                <input
                  id="location"
                  type="text"
                  name="location"
                  placeholder="Where are you going?"
                  value={location}
                  onChange={({ target }) => setLocation(target.value)}
                  onBlur={() => {
                    if (!location) {
                      setSearchMenu(null);
                      return;
                    }
                    setTimeout(() => {
                      setSearchMenu(null);
                    }, 150);
                  }}
                  className="w-full text-sm placeholder-gray-300 font-medium bg-transparent outline-none"
                />
              </div>
            </label>
            <button
              id="clear"
              className={`${
                location && searchMenu === EAppHeaderSearchMenu.LOCATION
                  ? 'flex'
                  : 'hidden'
              } items-center pr-4`}
              onClick={() => setLocation('')}
            >
              <XIcon className="h-6 bg-gray-200 bg-opacity-60 hover:bg-opacity-100 p-1 rounded-full" />
            </button>
          </div>

          {/* check in */}
          <div
            className="flex flex-col justify-center rounded-full px-8 hover:bg-gray-200 focus:hover:bg-white hover:bg-opacity-40 cursor-pointer focus:shadow-arround border-r-2"
            onFocus={() => setSearchMenu(EAppHeaderSearchMenu.CHECK_IN)}
            onBlur={() => setSearchMenu(null)}
            role="button"
            tabIndex={0}
          >
            <span className="font-bold text-xs text-gray-500 tracking-wide">
              Check in
            </span>
            <span className="text-sm text-gray-300 bg-transparent outline-none">
              Add dates
            </span>
          </div>

          {/* check out */}
          <div
            className="flex flex-col justify-center rounded-full px-8 hover:bg-gray-200 focus:hover:bg-white hover:bg-opacity-40 cursor-pointe focus:shadow-arround border-r-2"
            onFocus={() => setSearchMenu(EAppHeaderSearchMenu.CHECK_OUT)}
            onBlur={() => setSearchMenu(null)}
            role="button"
            tabIndex={0}
          >
            <span className="font-bold text-xs text-gray-500 tracking-wide">
              Check out
            </span>
            <span className="text-sm text-gray-300 bg-transparent outline-none">
              Add dates
            </span>
          </div>

          {/* guests */}
          <div
            className="flex justify-between items-stretch rounded-full pr-2 pl-8 hover:bg-gray-200 focus:hover:bg-white hover:bg-opacity-40 cursor-pointer focus:shadow-arround"
            onFocus={() => setSearchMenu(EAppHeaderSearchMenu.GUESTS)}
            onBlur={() => setSearchMenu(null)}
            role="button"
            tabIndex={0}
          >
            <div className="flex flex-grow flex-col justify-center">
              <span className="font-bold text-xs text-gray-500 tracking-wide">
                Guests
              </span>
              <span className="text-sm text-gray-300 bg-transparent outline-none">
                Add guests
              </span>
            </div>
            <button
              className={`flex items-center justify-center my-2 h-12 ${
                searchMenu ? 'w-28' : 'w-12'
              } rounded-full bg-primary ${
                searchMenu && 'saturate-200'
              } hover:saturate-200 duration-300`}
              onClick={() => setSearchMenu(() => EAppHeaderSearchMenu.LOCATION)}
            >
              <SearchIcon className="h-5 text-white" />{' '}
              <span
                className={`${
                  searchMenu ? 'inline-block' : 'hidden'
                } ml-2 font-medium text-white`}
              >
                Search
              </span>
            </button>
          </div>
        </div>
        {/* <div className="flex items-center"></div> */}
      </div>
    </header>
  );
};

export default AppHeader;
