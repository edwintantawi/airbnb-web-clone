/* eslint-disable @next/next/no-img-element */
import Link from 'next/link';

const AppBanner = () => {
  return (
    <section className="my-8">
      <div className="container">
        <Link href="#">
          <a className="relative block">
            <picture>
              <source
                srcSet="/assets/banners/1/banner-1-1440p-1x.jpg 1x, /assets/banners/1/banner-1-2560p-2x.jpg 2x"
                media="(min-width: 1440px)"
              />
              <source
                srcSet="/assets/banners/1/banner-1-720p-1x.jpg 1x, /assets/banners/1/banner-1-1440p-2x.jpg 2x"
                media="(min-width: 744px)"
              />
              <source
                srcSet="/assets/banners/1/banner-1-720p-1x-2.jpg 1x, /assets/banners/1/banner-1-1440p-2x-2.jpg 2x"
                media="(min-width: 744px)"
              />
              <source srcSet="/assets/banners/1/banner-1-320p-1x.jpg 1x, /assets/banners/1/banner-1-720p-2x.jpg 2x" />
              <img
                aria-hidden="true"
                alt="banner"
                decoding="async"
                loading="lazy"
                src="/assets/banners/1/banner-1.jpg"
                className="w-full md:h-[400px] lg:h-[480px] object-cover rounded-3xl"
              />
            </picture>

            <div className="absolute z-10 left-0 md:left-16 lg:left-32 right-0 md:right-16 lg:right-3left-32 top-10 md:top-auto md:bottom-1/2 md:translate-y-1/2 text-center md:text-left">
              <h2 className="w-[180px] md:w-[350px] mx-auto md:mx-0 text-2xl md:text-4xl xl:text-5xl text-center md:text-left font-medium">
                Not sure where to go? Perfect
              </h2>
              <button className="bg-gray-500 text-white font-medium py-2 md:py-3 px-6 mt-4 md:mt-9 rounded-lg">
                I&apos;m flexible
              </button>
            </div>
          </a>
        </Link>
      </div>
    </section>
  );
};

export default AppBanner;
