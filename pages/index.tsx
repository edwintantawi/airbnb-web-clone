/* eslint-disable @next/next/no-img-element */
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
// components
import AppHead from '@/components/atoms/AppHead';
import AppHeader from '@/components/organisms/AppHeader';
import AppHero from '@/components/atoms/AppHero';
import AppSection from '@/components/atoms/AppSection';
import AppBanner from '@/components/atoms/AppBanner';
import AppFooter from '@/components/atoms/AppFooter';

export default function Home({ exploreNearby, liveAnywhere }) {
  return (
    <>
      <AppHead />
      <AppHeader />
      <AppHero />
      <AppSection
        title="Explore Nearby"
        className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-y-2 gap-x-4"
      >
        {exploreNearby.map((data, index) => (
          <Link key={index} href="#">
            <a>
              <div
                key={data.location}
                className="flex items-center p-4 duration-300 gap-x-4 hover:bg-gray-200 hover:bg-opacity-40 rounded-xl hover:scale-105"
              >
                <Image
                  src={data.img}
                  alt={data.location}
                  width={64}
                  height={64}
                  placeholder="blur"
                  blurDataURL={data.img}
                  className="w-16 h-16 rounded-lg"
                />
                <div>
                  <h3 className="font-medium text-gray-500">{data.location}</h3>
                  <span className="text-gray-300">{data.distance}</span>
                </div>
              </div>
            </a>
          </Link>
        ))}
      </AppSection>
      <AppSection
        title="Live Anywhere"
        className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
      >
        {liveAnywhere.map((data, index) => (
          <Link key={index} href="#">
            <a>
              <div className="p-3 duration-300 gap-y-4 hover:scale-105 hover:bg-gray-200 hover:bg-opacity-40 rounded-xl">
                <div className="relative w-full mb-2 h-72">
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
                  <h3 className="text-lg font-medium text-gray-500 lg:text-xl">
                    {data.title}
                  </h3>
                </div>
              </div>
            </a>
          </Link>
        ))}
      </AppSection>
      <AppBanner />
      <AppFooter />
    </>
  );
}

export const getStaticProps = async () => {
  const exploreNearbyResponse = await fetch('https://jsonkeeper.com/b/4G1G');
  const exploreNearby = await exploreNearbyResponse.json();

  const liveAnywhereResponse = await fetch('https://jsonkeeper.com/b/VHHT');
  const liveAnywhere = await liveAnywhereResponse.json();

  return {
    props: { exploreNearby, liveAnywhere },
  };
};
