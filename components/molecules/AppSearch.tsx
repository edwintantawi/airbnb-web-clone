import React, { FC, useState } from 'react';
// components
import { EAppHeaderSelectedMenu } from '@/components/organisms/AppHeader';
import AppSearchItem from '@/components/molecules/AppSearchItem';
// data
import { useDataContext } from 'hooks/useDataContext';
import { DATA_ACTION_TYPES } from 'context/actionTypes';

enum EAppSearch {
  LOCATION = 'location',
  CHECK_IN = 'checkIn',
  CHECK_OUT = 'checkOut',
  GUESTS = 'guests',
}

interface IAppSearchProps {
  menu: EAppHeaderSelectedMenu | null;
  isActiveHeader: boolean;
}

const AppSearchMenu: FC<IAppSearchProps> = ({ menu, isActiveHeader }) => {
  const [searchMenu, setSearchMenu] = useState<EAppSearch | null>(null);
  // data
  const [{ location, checkIn, checkOut, guests }, dispatch] = useDataContext();
  // handler
  const handleOnBlur = () => setSearchMenu(null);

  return (
    <>
      <div className={`${isActiveHeader ? 'visible' : 'invisible'} px-4`}>
        <div
          className={`${
            !isActiveHeader && 'translate-y-[-75px] transform scale-50 opacity-0 z-[100]'
          } max-w-[850px] mx-auto mt-2 rounded-full bg-white border border-gray-200 duration-300 hidden md:flex`}
        >
          <div
            className={`${
              menu === EAppHeaderSelectedMenu.EXPERIENCES
                ? 'grid-cols-2'
                : 'grid-cols-[1fr,0.7fr,0.7fr,auto]'
            } grid flex-grow`}
          >
            {/* location */}
            <AppSearchItem
              separator
              type="inputText"
              title="Location"
              placeholder="Where are you going?"
              active={searchMenu === EAppSearch.LOCATION}
              value={location}
              onChange={({ target }) =>
                dispatch({ type: DATA_ACTION_TYPES.SET_LOCATION, payload: target.value })
              }
              onFocus={() => setSearchMenu(EAppSearch.LOCATION)}
              onBlur={handleOnBlur}
              onClear={() => {
                dispatch({ type: DATA_ACTION_TYPES.SET_LOCATION, payload: '' });
                handleOnBlur();
              }}
            />

            {menu === EAppHeaderSelectedMenu.PLACES_TO_STAY ? (
              <>
                {/* check in */}
                <AppSearchItem
                  separator
                  title="Check in"
                  placeholder="Add dates"
                  active={searchMenu === EAppSearch.CHECK_IN}
                  value={checkIn}
                  onFocus={() => setSearchMenu(EAppSearch.CHECK_IN)}
                  onBlur={handleOnBlur}
                  onClear={() => {}}
                />
                {/* check out */}
                <AppSearchItem
                  separator
                  title="Check out"
                  placeholder="Add dates"
                  active={searchMenu === EAppSearch.CHECK_OUT}
                  value={checkOut}
                  onFocus={() => setSearchMenu(EAppSearch.CHECK_OUT)}
                  onBlur={handleOnBlur}
                  onClear={() => {}}
                />
                <AppSearchItem
                  withSearch
                  title="Guests"
                  placeholder="Add guests"
                  active={searchMenu === EAppSearch.GUESTS}
                  value={guests}
                  onFocus={() => setSearchMenu(EAppSearch.GUESTS)}
                  onBlur={handleOnBlur}
                  onClear={() => {}}
                  isSearch={!!searchMenu}
                  onSearch={() => setSearchMenu(EAppSearch.LOCATION)}
                />
              </>
            ) : (
              <AppSearchItem
                withSearch
                title="Date"
                placeholder="Add when you want to go"
                active={searchMenu === EAppSearch.GUESTS}
                value={guests}
                onFocus={() => setSearchMenu(EAppSearch.GUESTS)}
                onBlur={handleOnBlur}
                onClear={() => {}}
                isSearch={!!searchMenu}
                onSearch={() => setSearchMenu(EAppSearch.LOCATION)}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default AppSearchMenu;
