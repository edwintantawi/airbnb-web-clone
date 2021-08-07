import React from 'react';
// context
import { DATA_ACTION_TYPES } from 'context/actionTypes';
import { useDataContext } from 'hooks/useDataContext';
// components
import IAppClearButton from '@/components/atoms/AppClearButton';
import AppNearby from '@/components/atoms/AppNearby';
// icons
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/outline';

const AppSearchMobile = ({ active, onClose, exploreNearby }) => {
  const [{ location }, dispatch] = useDataContext();
  return (
    <section
      id="close"
      className={`fixed inset-0 z-[200] bg-white rounded-t-3xl px-4 ${
        active ? 'block' : 'hidden'
      }`}
      onClick={(event) => {
        const id = (event.target as Element).id;
        if (id === 'close') onClose();
      }}
    >
      <div className="flex items-center h-12 mt-4">
        <ChevronLeftIcon className="h-6 mr-4" onClick={onClose} />
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
          onClick={() => dispatch({ type: DATA_ACTION_TYPES.SET_LOCATION, payload: '' })}
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
  );
};

export default AppSearchMobile;
