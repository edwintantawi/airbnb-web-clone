import React, { FC, useState } from 'react';
import { DateRange } from 'react-date-range';
// components
import { EAppHeaderSelectedMenu } from '@/components/organisms/AppHeader';
import AppSearchItem from '@/components/molecules/AppSearchItem';
// data
import { useDataContext } from 'hooks/useDataContext';
import { DATA_ACTION_TYPES } from 'context/actionTypes';
// styles
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';

enum EFocusedDate {
  CHECK_IN = 'startDate',
  CHECK_OUT = 'endDate',
}

enum ESearchMenu {
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
  const [searchMenu, setSearchMenu] = useState<ESearchMenu | null>(null);
  // const [focusedDate, setFocusedDate] = useState<EFocusedDate>(EFocusedDate.CHECK_IN);
  // const [isActiveCalendar, setIsActiveCalendar] = useState<boolean>(false);
  // data
  const [{ location, checkIn, checkOut, guests }, dispatch] = useDataContext();
  // handler
  const handleOnBlur = () => setSearchMenu(null);

  // const selectionRange = {
  //   startDate: checkIn,
  //   endDate: checkOut,
  //   key: 'selection',
  // };

  const handleDatePicker = (range) => {
    const { startDate, endDate } = range.selection;
    dispatch({ type: DATA_ACTION_TYPES.SET_CHECK_IN, payload: startDate });
    dispatch({ type: DATA_ACTION_TYPES.SET_CHECK_OUT, payload: endDate });
  };

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
              active={searchMenu === ESearchMenu.LOCATION}
              value={location}
              onChange={({ target }) =>
                dispatch({ type: DATA_ACTION_TYPES.SET_LOCATION, payload: target.value })
              }
              onFocus={() => setSearchMenu(ESearchMenu.LOCATION)}
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
                  active={searchMenu === ESearchMenu.CHECK_IN}
                  value={new Date(checkIn).toLocaleString('en-US', {
                    month: 'long',
                    day: 'numeric',
                  })}
                  onFocus={() => {
                    // setIsActiveCalendar(true);
                    // setFocusedDate(EFocusedDate.CHECK_IN);
                    setSearchMenu(ESearchMenu.CHECK_IN);
                  }}
                  onBlur={handleOnBlur}
                  onClear={() => {}}
                />
                {/* check out */}
                <AppSearchItem
                  separator
                  title="Check out"
                  placeholder="Add dates"
                  active={searchMenu === ESearchMenu.CHECK_OUT}
                  value={new Date(checkOut).toLocaleString('en-US', {
                    month: 'long',
                    day: 'numeric',
                  })}
                  onFocus={() => {
                    // setIsActiveCalendar(true);
                    // setFocusedDate(EFocusedDate.CHECK_OUT);
                    setSearchMenu(ESearchMenu.CHECK_OUT);
                  }}
                  onBlur={handleOnBlur}
                  onClear={() => {}}
                />
                <AppSearchItem
                  withSearch
                  title="Guests"
                  placeholder="Add guests"
                  active={searchMenu === ESearchMenu.GUESTS}
                  value={guests}
                  onFocus={() => setSearchMenu(ESearchMenu.GUESTS)}
                  onBlur={handleOnBlur}
                  onClear={() => {}}
                  isSearch={!!searchMenu}
                  onSearch={() => setSearchMenu(ESearchMenu.LOCATION)}
                />
              </>
            ) : (
              <AppSearchItem
                withSearch
                title="Date"
                placeholder="Add when you want to go"
                active={searchMenu === ESearchMenu.GUESTS}
                value={guests}
                onFocus={() => setSearchMenu(ESearchMenu.GUESTS)}
                onBlur={handleOnBlur}
                onClear={() => {}}
                isSearch={!!searchMenu}
                onSearch={() => setSearchMenu(ESearchMenu.LOCATION)}
              />
            )}
          </div>
        </div>
        {/* date picker */}
        {/* <div
          className={`${
            isActiveCalendar ? 'flex' : 'hidden'
          } absolute right-1/2 translate-x-1/2`}
        >
          <div className="rounded-3xl w-[850px] overflow-hidden shadow-arround-bold mt-3">
            <DateRange
              ranges={[selectionRange]}
              onChange={handleDatePicker}
              months={2}
              direction="horizontal"
              className="p-8"
              showMonthAndYearPickers={false}
              rangeColors={['#F7F7F7']}
              minDate={new Date()}
              showDateDisplay={false}
              monthDisplayFormat="MMMM YYY"
            />
          </div>
        </div> */}
      </div>
    </>
  );
};

export default AppSearchMenu;
