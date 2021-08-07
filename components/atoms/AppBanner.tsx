/* eslint-disable @next/next/no-img-element */
import Image from 'next/image';
import Link from 'next/link';

const AppBanner = () => {
  return (
    <section className="my-12">
      <div className="container">
        <Link href="#">
          <a className="relative block">
            <div className="h-[400px] lg:h-[400px] object-cover rounded-3xl">
              <div className="absolute inset-0 z-10 bg-gradient-to-b from-transparent-white to-transparent md:hidden" />
              <Image
                src="/assets/banner.jpg"
                alt="banner"
                layout="fill"
                objectFit="cover"
                className="rounded-xl"
              />
            </div>

            <div className="absolute left-0 right-0 z-10 text-center md:left-16 lg:left-20 md:right-16 lg:right-20 top-10 md:top-auto md:bottom-1/2 md:translate-y-1/2 md:text-left">
              <h2 className="font-medium md:font-normal text-gray-500 mb-2 w-[180px] md:w-[350px] mx-auto md:mx-0 text-2xl md:text-4xl xl:text-5xl text-center md:text-left">
                The Greatest Outdoors
              </h2>
              <p className="mb-5 text-sm text-gray-500 md:text-base">
                Whitelists curated by Airbnb
              </p>
              <button className="px-6 py-2 font-medium text-white bg-gray-500 rounded-lg md:py-3">
                Get Inspired
              </button>
            </div>
          </a>
        </Link>
      </div>
    </section>
  );
};

export default AppBanner;
