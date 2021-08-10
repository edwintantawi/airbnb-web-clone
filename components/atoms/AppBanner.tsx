import Image from 'next/image';
import Link from 'next/link';

const AppBanner = () => {
  return (
    <section className="my-12 mb-20">
      <div className="container">
        <Link href="/">
          <a className="relative block">
            <div className="h-[400px] lg:h-[400px] object-cover rounded-3xl">
              <div className="absolute inset-0 z-10 md:hidden" />
              <Image
                src="/assets/banner.jpg"
                alt="banner"
                layout="fill"
                objectFit="cover"
                className="rounded-xl"
                placeholder="blur"
                quality={50}
                blurDataURL="/assets/banner.jpg"
              />
            </div>

            <div className="absolute z-10 right-8 left-8 sm:right-12 sm:left-12 md:left-16 lg:left-20 md:right-16 lg:right-20 top-8 sm:top-12 md:top-auto md:bottom-1/2 md:translate-y-1/2 md:text-left">
              <h2 className="font-bold sm:font-normal text-gray-500 md:mb-2 w-[180px] sm:w-[350px] md:mx-0 text-2xl sm:text-4xl xl:text-5xl leading-7">
                The Greatest Outdoors
              </h2>
              <p className="mb-4 text-xs text-gray-500 sm:mb-5 sm:text-base">
                Whitelists curated by Airbnb
              </p>
              <button className="px-6 py-2 text-sm font-medium text-white bg-gray-500 rounded-lg sm:text-base sm:py-3">
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
