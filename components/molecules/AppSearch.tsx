import React, { FC, useState } from 'react';
// components
import { EAppHeaderSelectedMenu } from '@/components/organisms/AppHeader';
import AppSearchItem from '@/components/atoms/AppSearchItem';

enum EAppSearch {
  LOCATION = 'location',
  CHECK_IN = 'checkIn',
  CHECK_OUT = 'checkOut',
  GUESTS = 'guests',
}

interface IAppSearchProps {
  menu: EAppHeaderSelectedMenu | null;
}

const AppSearchMenu: FC<IAppSearchProps> = ({ menu }) => {
  const [searchMenu, setSearchMenu] = useState<EAppSearch | null>(null);
  // data
  const [location, setLocation] = useState<string>('');
  const [checkIn, setCheckIn] = useState();
  const [checkOut, setCheckOut] = useState();
  const [guests, setGuests] = useState();
  // handler
  const handleOnBlur = () => setSearchMenu(null);

  return (
    <div className="flex max-w-[850px] mx-auto mt-3 rounded-full bg-white border border-gray-200">
      <div
        className={`grid ${
          menu === EAppHeaderSelectedMenu.EXPERIENCES
            ? 'grid-cols-2'
            : 'grid-cols-[1fr,0.7fr,0.7fr,auto]'
        } flex-grow`}
      >
        {/* location */}
        <AppSearchItem
          type="inputText"
          title="Location"
          placeholder="Where are you going?"
          active={searchMenu === EAppSearch.LOCATION}
          value={location}
          onChange={({ target }) => setLocation(target.value)}
          onFocus={() => setSearchMenu(EAppSearch.LOCATION)}
          onBlur={handleOnBlur}
          onClear={() => {
            setLocation('');
            handleOnBlur();
          }}
        />

        {menu === EAppHeaderSelectedMenu.PLACES_TO_STAY ? (
          <>
            {/* check in */}
            <AppSearchItem
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
  );
};

export default AppSearchMenu;
