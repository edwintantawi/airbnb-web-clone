import Image from 'next/image';

const AppHero = () => {
  return (
    <section className="relative h-[65vh] md:h-[85vh]">
      <div className="absolute z-10 w-full bg-gradient-to-b from-transparent-black to-transparent h-28" />
      <Image
        src="/assets/hero.jpg"
        layout="fill"
        alt="hero"
        objectFit="cover"
        objectPosition="center bottom"
        placeholder="blur"
        blurDataURL="/assets/hero.jpg"
        quality={50}
      />

      <div className="container">
        <div className="absolute z-10 left-0 right-0 top-[45%] md:top-[50%] xl:top-[40%]">
          <h1 className="max-w-[250px] xl:max-w-[350px] mx-auto px-4 text-2xl font-bold tracking-wide text-center text-gray-500 md:px-0 md:text-3xl xl:text-4xl">
            Not sure where to go? Perfect.
          </h1>
          <div className="text-center">
            <button className="px-8 py-2 mx-auto mt-4 text-sm font-medium text-white duration-150 rounded-md sm:py-3 active:scale-90 text-md bg-primary md:mx-0 hover:shadow-xl lg:text-base">
              I&apos;m flexible
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AppHero;
