import Link from 'next/link';
import Image from 'next/image';
// icons
import { GlobeAltIcon } from '@heroicons/react/outline';

const SITE_MAP = [
  {
    title: 'ABOUT',
    sitemap: [
      'How Airbnb works',
      'Newsroom',
      'Airbnb 2021',
      'Investors',
      'Airbnb Plus',
      'Airbnb Luxe',
      'HotelTonight',
      'Airbnb for Work',
      'Made possible by Hosts',
      'Careers',
      "Founders' Letter",
    ],
  },
  {
    title: 'COMMUNITY',
    sitemap: [
      'Diversity & Belonging',
      'Against Discrimination',
      'Accessibility',
      'Airbnb Associates',
      'Frontline Stays',
      'Guest Referrals',
      'Gift cards',
      'Airbnb.org',
    ],
  },
  {
    title: 'HOST',
    sitemap: [
      'Host your home',
      'Host an Online Experience',
      'Host an Experience',
      'Responsible hosting',
      'Resource Center',
      'Community Center',
    ],
  },
  {
    title: 'SUPPORT',
    sitemap: [
      'Our COVID-19 Response',
      'Help Center',
      'Cancellation options',
      'Neighborhood Support',
      'Trust & Safety',
    ],
  },
];

const AppFooter = () => {
  return (
    <footer className="bg-gray-100 border-t border-gray-200">
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-4">
          {SITE_MAP.map(({ title, sitemap }, index) => (
            <div
              key={title}
              className={`${
                index !== 0 && 'border-t border-gray-200 lg:border-none'
              } py-6 md:py-8`}
            >
              <span className="inline-block mb-4 text-sm font-medium">{title}</span>
              <ul className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-1 gap-y-3 xl:gap-y-4">
                {sitemap.map((data) => (
                  <li
                    key={data}
                    className="text-sm text-gray-500 hover:text-gray-400 hover:underline"
                  >
                    <Link href="/">
                      <a>{data}</a>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="flex flex-col items-center justify-between py-5 text-sm text-gray-400 border-t border-gray-200 lg:py-6 lg:flex-row">
          <div className="flex flex-col items-center order-last lg:flex-row lg:order-none">
            <span className="mr-0 text-center lg:mr-4">© 2021 Airbnb, Inc.</span>
            <span className="mb-2 mr-0 lg:mr-8 lg:mb-0">
              | Clone by{' '}
              <a
                href="https://edwintantawi.vercel.app"
                target="_blank"
                rel="noreferrer"
                className="font-medium text-primary hover:underline"
              >
                Edwin Tantawi
              </a>{' '}
              |
            </span>
            <ul className="flex space-x-6 list-disc">
              <li className="hover:underline">
                <Link href="/">
                  <a>Privacy</a>
                </Link>
              </li>
              <li className="hover:underline">
                <Link href="/">
                  <a>Terms</a>
                </Link>
              </li>
              <li className="hover:underline">
                <Link href="/">
                  <a>Sitemap</a>
                </Link>
              </li>
            </ul>
          </div>
          <div className="flex flex-col items-center mb-4 space-y-4 lg:space-y-0 lg:flex-row lg:space-x-12 lg:mb-0">
            <ul className="flex items-center space-x-4">
              <li>
                <Link href="/">
                  <a className="flex items-center">
                    <GlobeAltIcon className="h-5 mr-1" />
                    <span className="underline">English (US)</span>
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/">
                  <a className="flex items-center">
                    <span className="mr-1">$</span>
                    <span className="underline">USD</span>
                  </a>
                </Link>
              </li>
            </ul>
            <ul className="flex space-x-6">
              <li className="flex items-center">
                <Link href="/">
                  <a>
                    <Image
                      src="/assets/icons/facebook.svg"
                      alt="facebook"
                      height={16}
                      width={16}
                    />
                  </a>
                </Link>
              </li>
              <li className="flex items-center">
                <Link href="/">
                  <a>
                    <Image
                      src="/assets/icons/twitter.svg"
                      alt="facebook"
                      height={16}
                      width={16}
                    />
                  </a>
                </Link>
              </li>
              <li className="flex items-center">
                <Link href="/">
                  <a>
                    <Image
                      src="/assets/icons/instagram.svg"
                      alt="facebook"
                      height={16}
                      width={16}
                    />
                  </a>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default AppFooter;
