import { FC } from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface IAppNearby {
  data: { location: string; img: string; distance: string };
  isSmall?: boolean;
}

const AppNearby: FC<IAppNearby> = ({ data, isSmall }) => {
  return (
    <Link href="#">
      <a>
        <div
          key={data.location}
          className="flex items-center p-2 duration-300 md:p-3 gap-x-4 hover:bg-gray-200 hover:bg-opacity-40 rounded-xl hover:scale-105"
        >
          <Image
            src={data.img}
            alt={data.location}
            width={isSmall ? 48 : 64}
            height={isSmall ? 48 : 64}
            placeholder="blur"
            blurDataURL={data.img}
            className="rounded-lg"
          />
          <div>
            <h3
              className={`${isSmall ? 'text-sm' : 'text-base'} font-medium text-gray-500`}
            >
              {data.location}
            </h3>
            <span className={`${isSmall ? 'text-sm' : 'text-base'} text-gray-300`}>
              {data.distance}
            </span>
          </div>
        </div>
      </a>
    </Link>
  );
};

export default AppNearby;
