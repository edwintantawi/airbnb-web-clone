import React, { FC } from 'react';
import Image from 'next/image';
import Link from 'next/link';
// components
import AppHead from '@/components/atoms/AppHead';
import AppHeader from '@/components/organisms/AppHeader';
import AppHero from '@/components/atoms/AppHero';
import AppSection from '@/components/atoms/AppSection';
import AppBanner from '@/components/atoms/AppBanner';
import AppFooter from '@/components/atoms/AppFooter';
import AppNearby from '@/components/atoms/AppNearby';
// typings
import { IExploreNearby, ILiveAnywhere } from 'typings';
// utils
import { getExploreNearby, getLiveAnywhere } from 'utils/data';

interface IHomeDataProps {
  exploreNearby: IExploreNearby[];
  liveAnywhere: ILiveAnywhere[];
}

const Home: FC<IHomeDataProps> = ({ exploreNearby, liveAnywhere }) => {
  return (
    <>
      <AppHead />
      <AppHeader exploreNearby={exploreNearby} />
      <main>
        {/* hero */}
        <AppHero />
        {/* explore nearby section */}
        <AppSection
          title="Explore Nearby"
          className="grid grid-cols-2 lg:gap-x-4 gap-x-1 gap-y-2 sm:grid-cols-3 lg:grid-cols-4"
        >
          {exploreNearby.map((data, index) => (
            <AppNearby key={index} data={data} />
          ))}
        </AppSection>
        {/* live anywhere section */}
        <AppSection
          title="Live Anywhere"
          className="grid grid-cols-2 lg:gap-x-4 gap-x-1 gap-y-2 lg:grid-cols-4"
        >
          {liveAnywhere.map((data, index) => (
            <Link key={index} href="#">
              <a>
                <div className="p-2 duration-300 lg:p-3 gap-y-4 active:scale-105 active:bg-gray-200 active:bg-opacity-40 rounded-xl">
                  <div className="relative w-full h-40 mb-2 md:h-60 lg:h-72">
                    <Image
                      src={data.img}
                      alt={data.title}
                      layout="fill"
                      objectFit="cover"
                      placeholder="blur"
                      blurDataURL={data.img}
                      className="rounded-xl"
                    />
                  </div>
                  <div>
                    <h3 className="font-medium leading-5 text-gray-500 text-md md:text-xl">
                      {data.title}
                    </h3>
                  </div>
                </div>
              </a>
            </Link>
          ))}
        </AppSection>
        {/* bottom banner */}
        <AppBanner />
      </main>
      {/* footer */}
      <AppFooter />
    </>
  );
};

export const getStaticProps = async () => {
  const exploreNearby = await getExploreNearby();
  const liveAnywhere = await getLiveAnywhere();

  return {
    props: { exploreNearby, liveAnywhere },
  };
};

export default Home;
