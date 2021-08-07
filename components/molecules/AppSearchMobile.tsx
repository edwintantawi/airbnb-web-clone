import React, { FC, MouseEvent, useState } from 'react';
// context
import { DATA_ACTION_TYPES } from 'context/actionTypes';
import { useDataContext } from 'hooks/useDataContext';
// components
import IAppClearButton from '@/components/atoms/AppClearButton';
import AppNearby from '@/components/atoms/AppNearby';
// icons
import { ChevronLeftIcon, ChevronRightIcon, SearchIcon } from '@heroicons/react/outline';
// typings
import { IExploreNearby } from 'typings';

interface IAppSearchMobile {
  exploreNearby: IExploreNearby[];
}

const AppSearchMobile: FC<IAppSearchMobile> = ({ exploreNearby }) => {
  const [activeSearch, setActiveSearch] = useState<boolean>(false);
  const [{ location }, dispatch] = useDataContext();

  const handleSectionClick = (event: MouseEvent<HTMLElement>) => {
    const id = (event.target as Element).id;
    if (id === 'close') setActiveSearch(false);
  };

  return (
    <>
      {/* mobile search button */}
      <button
        className="container block w-full md:hidden"
        onClick={() => setActiveSearch(true)}
      >
        <div className="flex items-center justify-center h-12 bg-gray-100 rounded-full">
          <SearchIcon className="h-5 mr-1 text-primary" />
          <span className="text-sm font-medium tracking-wide">Where are you going?</span>
        </div>
      </button>
      {/* mobile search section */}
      <section
        id="close"
        className={`fixed inset-0 bg-white rounded-t-3xl px-4 ${
          activeSearch ? 'block' : 'hidden'
        }`}
        onClick={handleSectionClick}
      >
        <div className="flex items-center h-12 mt-4">
          <button onClick={() => setActiveSearch(false)} className="p-1 mr-4">
            <ChevronLeftIcon className="h-6" />
          </button>
          <input
            type="text"
            placeholder="Where are you going?"
            value={location}
            onChange={({ target }) =>
              dispatch({ type: DATA_ACTION_TYPES.SET_LOCATION, payload: target.value })
            }
            className="flex-grow mr-4 placeholder-gray-300"
          />
          <IAppClearButton
            active={location}
            onClick={() =>
              dispatch({ type: DATA_ACTION_TYPES.SET_LOCATION, payload: '' })
            }
          />
        </div>
        <div className="mt-6">
          <h2 className="mb-4 text-xs font-bold">GO ANYWHERE, ANYTIME</h2>
          <button className="flex justify-between w-full px-6 py-4 border border-gray-200 rounded-full shadow-md text-primary">
            <span className="font-bold">I&apos;m flexible</span>{' '}
            <ChevronRightIcon className="h-6" />
          </button>
        </div>
        <div className="mt-6">
          <h2 className="mb-4 text-xs font-bold">GETAWAYS NEAR YOU</h2>
          {exploreNearby.slice(0, 4).map((data, index) => (
            <AppNearby key={index} data={data} isSmall />
          ))}
        </div>
      </section>
    </>
  );
};

export default AppSearchMobile;
