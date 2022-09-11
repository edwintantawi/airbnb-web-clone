import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { Marker } from 'react-map-gl';
import { getCenter } from 'geolib';
import Image from 'next/image';
// components
import AppFooter from '@/components/atoms/AppFooter';
import AppHead from '@/components/atoms/AppHead';
import AppHeader from '@/components/organisms/AppHeader';
import AppPlaceCard from '@/components/atoms/AppPlaceCard';
import AppMap from '@/components/atoms/AppMap';
// utils
import { formatGuests, formatRangeDate } from 'utils';
// icons
import { MapIcon, ClipboardIcon } from '@heroicons/react/solid';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/outline';
import { getSearch } from 'utils/data';

const Search = ({ searchResults }) => {
  const router = useRouter();
  const query = router.query;
  const [visibleMapButton, setVisibleMapButton] = useState<boolean>(true);
  const [currentScroll, setCurrentScroll] = useState<number>(0);
  const [isFullMap, setIsFullMap] = useState<boolean>(false);
  const [map, setMap] = useState<boolean>(false);
  // data
  const [location, setLocation] = useState<string>('');
  const [checkIn, setCheckIn] = useState<Date>(null);
  const [checkOut, setCheckOut] = useState<Date>(null);
  const [guests, setGuests] = useState<Object>();

  useEffect(() => {
    setLocation(query.location?.toString());
    if (query.checkIn) setCheckIn(new Date(query.checkIn?.toString()));
    if (query.checkOut) setCheckOut(new Date(query.checkOut?.toString()));
    if (query.guests) setGuests(JSON.parse(query.guests?.toString()));
  }, [query]);

  useEffect(() => {
    const handleOnScroll = () => {
      const position = window.scrollY;
      position > currentScroll ? setVisibleMapButton(false) : setVisibleMapButton(true);
      setCurrentScroll(position);
    };
    window.addEventListener('scroll', handleOnScroll);
    return () => window.removeEventListener('scroll', handleOnScroll);
  });

  const getGuests = (guests) => {
    const totalGuests = formatGuests(guests, { noInfants: true });
    if (totalGuests) return `• ${totalGuests}`;
  };

  const getDates = (startDate, endDate) => {
    const dates = formatRangeDate(startDate, endDate);
    if (dates) return `• ${dates}`;
  };

  const getCenterMap = () => {
    const coords = searchResults.map((result) => ({
      latitude: result.lat,
      longitude: result.long,
    }));
    return getCenter(coords) || { latitude: 0, longitude: 0 };
  };

  return (
    <div className="flex flex-col min-h-screen">
      <AppHead />
      <AppHeader searchPage query={{ location, checkIn, checkOut, guests }} />
      <main
        className={`${
          !isFullMap && 'lg:grid-cols-[700px,1fr] xl:grid-cols-[840px,1fr]'
        } flex-grow grid grid-cols-1 mt-[86px] duration-500`}
      >
        {/* left - cards */}
        <div
          className={`${isFullMap && 'hidden'} px-4 py-8 duration-500 lg:py-12 lg:px-7`}
        >
          {/* search data */}
          <span className="inline-block mb-2 text-sm text-gray-400">
            217 Stays {checkIn && getDates(checkIn, checkOut)}{' '}
            {guests && getGuests(guests)}
          </span>
          {/* title */}
          <h1 className="mb-2 text-2xl font-semibold md:text-3xl lg:text-4xl lg:mb-7">
            Stays in {location}
          </h1>
          {/* filters */}
          <div className="mb-4 space-x-1 space-y-2 text-gray-400 md:space-x-2 lg:mb-8">
            <button className="px-2 py-1 text-xs duration-300 border border-gray-300 border-opacity-50 rounded-full cursor-pointer md:px-4 md:py-2 lg:text-sm active:scale-90 hover:border-gray-500">
              Cancellation flexibility
            </button>
            <button className="px-2 py-1 text-xs duration-300 border border-gray-300 border-opacity-50 rounded-full cursor-pointer md:px-4 md:py-2 lg:text-sm active:scale-90 hover:border-gray-500">
              Type of place
            </button>
            <button className="px-2 py-1 text-xs duration-300 border border-gray-300 border-opacity-50 rounded-full cursor-pointer md:px-4 md:py-2 lg:text-sm active:scale-90 hover:border-gray-500">
              Price
            </button>
            <button className="px-2 py-1 text-xs duration-300 border border-gray-300 border-opacity-50 rounded-full cursor-pointer md:px-4 md:py-2 lg:text-sm active:scale-90 hover:border-gray-500">
              Instant Book
            </button>
            <button className="px-2 py-1 text-xs duration-300 border border-gray-300 border-opacity-50 rounded-full cursor-pointer md:px-4 md:py-2 lg:text-sm active:scale-90 hover:border-gray-500">
              More filters
            </button>
          </div>
          {/* information */}
          <p className="mb-4 text-sm text-gray-400">
            Review COVID-19 travel restrictions before you book.{' '}
            <Link href="/">
              <a className="underline">Learn more</a>
            </Link>
          </p>
          {/* list */}
          <section>
            {searchResults.map((result) => (
              <AppPlaceCard key={result.long + result.lat} data={result} />
            ))}
          </section>
        </div>
        {/* right - maps */}
        <section
          className={`${
            map ? 'block fixed left-0 right-0 bottom-0 top-0' : 'hidden'
          } sm:block sm:sticky top-[86px] h-map flex-grow bg-yellow-900 bg-opacity-10 duration-100`}
        >
          <AppMap center={getCenterMap()}>
            <button
              className="items-center hidden p-3 m-4 text-gray-500 duration-300 bg-white border border-gray-200 rounded-lg shadow-lg sm:flex active:scale-90"
              onClick={() => (isFullMap ? setIsFullMap(false) : setIsFullMap(true))}
            >
              {isFullMap ? (
                <>
                  <ChevronRightIcon className="h-5" />{' '}
                  <span className="ml-2 text-sm font-semibold">Show list</span>
                </>
              ) : (
                <ChevronLeftIcon className="h-5" />
              )}
            </button>
            {searchResults.map((result) => (
              <Marker
                key={result.lat + result.long}
                latitude={result.lat}
                longitude={result.long}
                offsetLeft={-20}
                offsetTop={-10}
              >
                <button className="relative">
                  <button className="px-3 py-1 font-bold duration-300 bg-white rounded-full shadow-md cursor-pointer focus:scale-90 peer">
                    {result.price.split('/')[0]}
                  </button>
                  <div className="absolute hidden w-48 p-3 text-left bg-white border border-gray-200 rounded-lg cursor-pointer bottom-9 peer-focus:block">
                    <div className="relative w-full h-24 mb-2">
                      <Image
                        src={result.img}
                        alt={result.title}
                        layout="fill"
                        objectFit="cover"
                        className="rounded-lg"
                        placeholder="blur"
                        blurDataURL={result.img}
                      />
                    </div>
                    <div>
                      <h2 className="text-sm font-semibold">{result.title}</h2>
                    </div>
                  </div>
                </button>
              </Marker>
            ))}
          </AppMap>
        </section>
        {/* map toggler */}
        <button
          className={`${
            visibleMapButton
              ? 'translate-y-0 md:translate-y-[50px]'
              : 'translate-y-[80px] md:translate-y-[200px]'
          } lg:hidden duration-300 fixed flex items-center px-5 py-3 text-sm text-white translate-x-1/2 bg-gray-500 rounded-full right-1/2 bottom-20 shadow-lg active:scale-90`}
          onClick={() => {
            map ? setMap(false) : setMap(true);
          }}
        >
          {map ? (
            <>
              <span>List</span> <ClipboardIcon className="h-4 ml-2" />
            </>
          ) : (
            <>
              <span>Map</span> <MapIcon className="h-4 ml-2" />
            </>
          )}
        </button>
      </main>
      {/* footer */}
      {!isFullMap && <AppFooter />}
    </div>
  );
};

export const getServerSideProps = async () => {
  const searchResults = await getSearch();

  return {
    props: { searchResults },
  };
};

export default Search;
