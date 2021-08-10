import { FC } from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface IAppNearbyProps {
  data: { location: string; img: string; distance: string };
  isSmall?: boolean;
}

const AppNearby: FC<IAppNearbyProps> = ({ data, isSmall }) => {
  return (
    <Link href="/">
      <a>
        <div
          key={data.location}
          className={`${
            isSmall ? 'items-center' : 'flex-col items-start md:items-center'
          } flex  p-2 duration-300 md:flex-row md:p-3 gap-x-4 active:scale-105 active:bg-gray-200 active:bg-opacity-40 rounded-xl`}
        >
          <Image
            src={data.img}
            alt={data.location}
            width={isSmall ? 48 : 64}
            height={isSmall ? 48 : 64}
            placeholder="blur"
            blurDataURL={data.img}
            className="rounded-lg"
            objectFit="cover"
          />
          <div className={`${isSmall || 'mt-2'} md:mt-0`}>
            <h3
              className={`${
                isSmall ? 'text-sm' : 'text-sm lg:text-base'
              } font-medium text-gray-500`}
            >
              {data.location}
            </h3>
            <span
              className={`${isSmall ? 'text-sm' : 'text-sm lg:text-base'} text-gray-300`}
            >
              {data.distance}
            </span>
          </div>
        </div>
      </a>
    </Link>
  );
};

export default AppNearby;
