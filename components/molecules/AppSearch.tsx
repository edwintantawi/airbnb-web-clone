import React, { FC, FocusEvent, useState } from 'react';
import { format } from 'date-fns';
// components
import { EAppHeaderSelectedMenu } from '@/components/organisms/AppHeader';
import AppSearchItem from '@/components/molecules/AppSearchItem';
import AppDateRange from '@/components/atoms/AppDateRange';
// data
import { useDataContext } from 'hooks/useDataContext';
import { DATA_ACTION_TYPES } from 'context/actionTypes';
// styles
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
// icons
import { ChevronRightIcon, PlusIcon, MinusIcon } from '@heroicons/react/outline';

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
  // data
  const [{ location, checkIn, checkOut, guests }, dispatch] = useDataContext();
  // handler
  const handleOnBlur = (event?: FocusEvent<HTMLElement>) => {
    const { relatedTarget } = event || {};
    if (!relatedTarget) {
      setSearchMenu(null);
      return;
    }

    const relatedTargetClassList = Array.from((relatedTarget as Element)?.classList);
    const result = relatedTargetClassList.some(
      (className) => className.slice(0, 3) === 'rdr'
    );
    console.log('class:', relatedTargetClassList);
    console.log('result:', result);
    if (!result) setSearchMenu(null);
  };

  const formatCheckDate = (date: Date) => {
    if (!date) return false;
    return format(date, 'MMM d');
  };

  const rangeDate = (startDate, endDate) => {
    if (!startDate && !endDate) return false;
    const template = `${formatCheckDate(checkIn)} - ${formatCheckDate(checkOut)}`;
    return template;
  };

  const resetDate = () => {
    dispatch({
      type: DATA_ACTION_TYPES.SET_CHECK_IN,
      payload: null,
    });
    dispatch({
      type: DATA_ACTION_TYPES.SET_CHECK_OUT,
      payload: null,
    });
    handleOnBlur();
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
              relative
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
            >
              <div className="absolute left-0 px-8 pt-2 pb-8 mt-3 bg-white rounded-3xl shadow-arround-bold">
                <div className="mt-6">
                  <h2 className="mb-4 text-xs font-bold">GO ANYWHERE, ANYTIME</h2>
                  <button className="flex justify-between w-[436px] px-6 py-4 border border-gray-200 rounded-full shadow-md text-primary">
                    <span className="font-bold">I&apos;m flexible</span>{' '}
                    <ChevronRightIcon className="h-6" />
                  </button>
                </div>
              </div>
            </AppSearchItem>

            {menu === EAppHeaderSelectedMenu.PLACES_TO_STAY ? (
              <>
                {/* check in */}
                <AppSearchItem
                  separator
                  title="Check in"
                  placeholder="Add dates"
                  active={searchMenu === ESearchMenu.CHECK_IN}
                  value={formatCheckDate(checkIn)}
                  onFocus={() => {
                    // setFocusedDate(EFocusedDate.CHECK_IN);
                    setSearchMenu(ESearchMenu.CHECK_IN);
                  }}
                  onBlur={handleOnBlur}
                  onClear={resetDate}
                >
                  {/* date picker */}
                  <AppDateRange />
                </AppSearchItem>
                {/* check out */}
                <AppSearchItem
                  separator
                  title="Check out"
                  placeholder="Add dates"
                  active={searchMenu === ESearchMenu.CHECK_OUT}
                  value={formatCheckDate(checkOut)}
                  onFocus={() => {
                    // setFocusedDate(EFocusedDate.CHECK_OUT);
                    setSearchMenu(ESearchMenu.CHECK_OUT);
                  }}
                  onBlur={handleOnBlur}
                  onClear={resetDate}
                >
                  {/* date picker */}
                  <AppDateRange />
                </AppSearchItem>
                <AppSearchItem
                  relative
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
                >
                  <div className="absolute right-0 px-8 pt-2 pb-4 mt-3 bg-white rounded-3xl shadow-arround-bold w-96">
                    <div>
                      <div className="flex py-4 border-b border-gray-200 border-opacity-70">
                        <div className="flex-grow">
                          <h2 className="font-medium">Adults</h2>
                          <p className="text-sm leading-4 text-gray-300">
                            Ages 13 or above
                          </p>
                        </div>

                        <div className="flex items-center">
                          <button className="p-[7px] border border-gray-300 rounded-full border-opacity-70">
                            <MinusIcon className="h-4 text-gray-300" />
                          </button>
                          <span className="inline-block text-center w-9">0</span>
                          <button className="p-[7px] border border-gray-300 rounded-full border-opacity-70">
                            <PlusIcon className="h-4 text-gray-300" />
                          </button>
                        </div>
                      </div>
                    </div>
                    <div>
                      <div className="flex py-4 border-b border-gray-200 border-opacity-70">
                        <div className="flex-grow">
                          <h2 className="font-medium">Children</h2>
                          <p className="text-sm leading-4 text-gray-300">Ages 2-12</p>
                        </div>

                        <div className="flex items-center">
                          <button className="p-[7px] border border-gray-300 rounded-full border-opacity-70">
                            <MinusIcon className="h-4 text-gray-300" />
                          </button>
                          <span className="inline-block text-center w-9">0</span>
                          <button className="p-[7px] border border-gray-300 rounded-full border-opacity-70">
                            <PlusIcon className="h-4 text-gray-300" />
                          </button>
                        </div>
                      </div>
                    </div>
                    <div>
                      <div className="flex py-4">
                        <div className="flex-grow">
                          <h2 className="font-medium">Infants</h2>
                          <p className="text-sm leading-4 text-gray-300">Under 2</p>
                        </div>

                        <div className="flex items-center">
                          <button className="p-[7px] border border-gray-300 rounded-full border-opacity-70">
                            <MinusIcon className="h-4 text-gray-300" />
                          </button>
                          <span className="inline-block text-center w-9">0</span>
                          <button className="p-[7px] border border-gray-300 rounded-full border-opacity-70">
                            <PlusIcon className="h-4 text-gray-300" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </AppSearchItem>
              </>
            ) : (
              <AppSearchItem
                withSearch
                title="Date"
                placeholder="Add when you want to go"
                active={searchMenu === ESearchMenu.GUESTS}
                value={rangeDate(checkIn, checkOut)}
                onFocus={() => setSearchMenu(ESearchMenu.GUESTS)}
                onBlur={handleOnBlur}
                onClear={resetDate}
                isSearch={!!searchMenu}
                onSearch={() => setSearchMenu(ESearchMenu.LOCATION)}
              >
                {/* date picker */}
                <AppDateRange />
              </AppSearchItem>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default AppSearchMenu;
