/* eslint-disable @next/next/no-img-element */
const AppHero = () => {
  return (
    <section className="relative">
      <div className="absolute w-full bg-gradient-to-b from-transparent-black to-transparent h-28 z-10" />
      <picture>
        <source
          srcSet="/assets/hero/hero-2560p-1x.webp 1x, /assets/hero/hero-2560p-1x.webp 2x"
          media="(min-width: 1440px)"
        />
        <source
          srcSet="/assets/hero/hero-960p-1x.webp 1x, /assets/hero/hero-1920p-2x.webp 2x"
          media="(min-width: 950px)"
        />
        <source
          srcSet="/assets/hero/hero-720p-1x.webp 1x, /assets/hero/hero-1440p-2x.webp 2x"
          media="(min-width: 800px)"
        />
        <source srcSet="/assets/hero/hero-320p-1x.webp 1x, /assets/hero/hero-720p-2x.webp 2x" />
        <img
          aria-hidden="true"
          alt="hero"
          decoding="async"
          loading="lazy"
          className="h-screen md:h-[85vh] w-full object-cover object-left"
          src="/assets/hero/hero-1200p.webp"
        />
      </picture>

      <div className="container">
        <div className="absolute z-10 left-0 right-0 md:left-auto md:right-auto top-24 md:top-[38%]">
          <h1 className="max-w-[420px] md:w-[500px] px-4 md:px-0 mx-auto md:mx-0 font-bold text-2xl sm:text-3xl md:text-6xl xl:text-7xl text-center md:text-left text-white tracking-wide leading-8">
            Olympian & Paralympian Online Experiences
          </h1>
          <div className="text-center md:text-left">
            <button className="px-4 py-2 mt-4 mx-auto md:mx-0 rounded-md font-medium text-sm bg-white">
              Explore now
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AppHero;
