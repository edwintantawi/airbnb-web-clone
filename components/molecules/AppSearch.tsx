import React, { FC, FocusEvent, FormEvent, useState } from 'react';
import { format } from 'date-fns';
import { useRouter } from 'next/router';

// components
import { EAppHeaderSelectedMenu } from '@/components/organisms/AppHeader';
import AppSearchItem from '@/components/molecules/AppSearchItem';
import AppDateRange from '@/components/atoms/AppDateRange';
import AppCounter from '@/components/atoms/AppCounter';
import AppSearchItemContent from '@/components/atoms/AppSearchItemContent';
// data
import { useDataContext } from 'hooks/useDataContext';
import { DATA_ACTION_TYPES } from 'context/actionTypes';
// styles
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
// icons
import { ChevronRightIcon } from '@heroicons/react/outline';

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
  const router = useRouter();
  const [searchMenu, setSearchMenu] = useState<ESearchMenu | null>(null);
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
    const result = relatedTargetClassList.some((className) => {
      const prefix = ['rdr', 'btn'];
      if (prefix.includes(className.slice(0, 3))) return true;
    });
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

  const formatGuests = () => {
    const { children, adults, infants } = guests;
    const total = adults + children;
    if (!total) return 0;
    let template = `${total} guest`;
    if (total >= 2) template = `${total} guests`;
    if (infants) template += `, ${infants} infant`;
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

  const handleOnSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!location) {
      setSearchMenu(ESearchMenu.LOCATION);
      return;
    }

    router.push({
      pathname: '/search',
      query: {
        location,
        checkIn: checkIn?.toISOString(),
        checkOut: checkOut?.toISOString(),
        guests: JSON.stringify(guests),
      },
    });
  };

  const dateRangeStyle =
    'left-4 right-4 searchbar:left-auto searchbar:right-1/2 searchbar:translate-x-1/2 searchbar:w-[850px]';

  return (
    <>
      <div className={`${isActiveHeader ? 'visible' : 'invisible'} px-4`}>
        <div
          className={`${
            !isActiveHeader && 'translate-y-[-75px] transform scale-50 opacity-0 z-[100]'
          } max-w-[850px] mx-auto mt-2 rounded-full bg-white border border-gray-200 duration-300 hidden md:flex`}
        >
          <form
            action="/search"
            className={`${
              menu === EAppHeaderSelectedMenu.EXPERIENCES
                ? 'grid-cols-2'
                : 'grid-cols-[0.8fr,0.7fr,0.7fr,auto] lg:grid-cols-[1fr,0.7fr,0.7fr,auto]'
            } grid flex-grow`}
            onSubmit={handleOnSubmit}
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
              <AppSearchItemContent className="left-0">
                <div className="py-4">
                  <h2 className="mb-4 text-xs font-bold">GO ANYWHERE, ANYTIME</h2>
                  <button className="flex justify-between w-[436px] px-6 py-4 border border-gray-200 rounded-full shadow-md text-primary">
                    <span className="font-bold">I&apos;m flexible</span>{' '}
                    <ChevronRightIcon className="h-6" />
                  </button>
                </div>
              </AppSearchItemContent>
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
                  onFocus={() => setSearchMenu(ESearchMenu.CHECK_IN)}
                  onBlur={handleOnBlur}
                  onClear={resetDate}
                >
                  {/* date picker */}
                  <AppSearchItemContent className={dateRangeStyle}>
                    <AppDateRange />
                  </AppSearchItemContent>
                </AppSearchItem>
                {/* check out */}
                <AppSearchItem
                  separator
                  title="Check out"
                  placeholder="Add dates"
                  active={searchMenu === ESearchMenu.CHECK_OUT}
                  value={formatCheckDate(checkOut)}
                  onFocus={() => setSearchMenu(ESearchMenu.CHECK_OUT)}
                  onBlur={handleOnBlur}
                  onClear={resetDate}
                >
                  {/* date picker */}
                  <AppSearchItemContent className={dateRangeStyle}>
                    <AppDateRange />
                  </AppSearchItemContent>
                </AppSearchItem>
                <AppSearchItem
                  relative
                  withSearch
                  title="Guests"
                  placeholder="Add guests"
                  active={searchMenu === ESearchMenu.GUESTS}
                  value={formatGuests()}
                  onFocus={() => setSearchMenu(ESearchMenu.GUESTS)}
                  onBlur={handleOnBlur}
                  onClear={() => {
                    dispatch({ type: DATA_ACTION_TYPES.RESET_GUESTS });
                    handleOnBlur();
                  }}
                  isSearch={!!searchMenu}
                  onSearch={() => setSearchMenu(ESearchMenu.LOCATION)}
                >
                  <AppSearchItemContent className="right-0 w-96">
                    <div>
                      <div className="flex py-4 border-b border-gray-200 border-opacity-70">
                        <div className="flex-grow">
                          <h2 className="font-medium">Adults</h2>
                          <p className="text-sm leading-4 text-gray-300">
                            Ages 13 or above
                          </p>
                        </div>
                        <AppCounter
                          value={guests.adults}
                          maxValue={16}
                          onIncrease={() =>
                            dispatch({ type: DATA_ACTION_TYPES.INCREASE_ADULTS })
                          }
                          onDescrease={() =>
                            dispatch({ type: DATA_ACTION_TYPES.DECREASE_ADULTS })
                          }
                        />
                      </div>
                    </div>
                    <div>
                      <div className="flex py-4 border-b border-gray-200 border-opacity-70">
                        <div className="flex-grow">
                          <h2 className="font-medium">Children</h2>
                          <p className="text-sm leading-4 text-gray-300">Ages 2-12</p>
                        </div>
                        <AppCounter
                          value={guests.children}
                          maxValue={5}
                          onIncrease={() =>
                            dispatch({ type: DATA_ACTION_TYPES.INCREASE_CHILDREN })
                          }
                          onDescrease={() =>
                            dispatch({ type: DATA_ACTION_TYPES.DECREASE_CHILDREN })
                          }
                        />
                      </div>
                    </div>
                    <div>
                      <div className="flex py-4">
                        <div className="flex-grow">
                          <h2 className="font-medium">Infants</h2>
                          <p className="text-sm leading-4 text-gray-300">Under 2</p>
                        </div>
                        <AppCounter
                          value={guests.infants}
                          maxValue={5}
                          onIncrease={() =>
                            dispatch({ type: DATA_ACTION_TYPES.INCREASE_INFANTS })
                          }
                          onDescrease={() =>
                            dispatch({ type: DATA_ACTION_TYPES.DECREASE_INFANTS })
                          }
                        />
                      </div>
                    </div>
                  </AppSearchItemContent>
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
                onSearch={() => {}}
              >
                {/* date picker */}
                <AppSearchItemContent className={dateRangeStyle}>
                  <AppDateRange />
                </AppSearchItemContent>
              </AppSearchItem>
            )}
          </form>
        </div>
      </div>
    </>
  );
};

export default AppSearchMenu;
