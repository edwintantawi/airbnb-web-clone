import Image from 'next/image';
// icons
import { StarIcon } from '@heroicons/react/solid';

const AppPlaceCard = ({ data }) => {
  return (
    <div className="grid sm:grid-cols-[300px,1fr] py-5 border-gray-200 cursor-pointer sm:border-t grid-cols-1 gap-x-4">
      {/* left - image */}
      <div className="relative w-full mb-2 md:mb-0 sm:h-44 h-52">
        <Image
          src={data.img}
          alt={data.title}
          layout="fill"
          objectFit="cover"
          className="w-full rounded-xl"
          placeholder="blur"
          blurDataURL={data.img}
          quality={40}
        />
      </div>
      {/* right - detail */}
      <div className="flex flex-col px-1 sm:px-0">
        {/* detail top */}
        <div className="flex-grow">
          <span className="text-sm text-gray-300">{data.location}</span>
          <h3 className="text-lg">{data.title}</h3>
          <hr className="hidden w-10 mt-3 mb-1 border-b border-gray-200 border-opacity-60 sm:block" />
          <span className="text-sm text-gray-300">{data.description}</span>
        </div>

        {/* detail bottom */}
        <div className="flex justify-between order-first sm:order-none">
          <div className="flex items-center">
            <StarIcon className="h-5 text-primary" />
            <span className="mx-1 font-semibold">{data.star}</span>
            <span className="text-sm text-gray-300">({data.reviews})</span>
          </div>
          <div>
            <span className="mr-1 text-lg font-semibold">{data.price.split('/')[0]}</span>
            <span className="font-light md:text-lg text-md">/ night</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppPlaceCard;
