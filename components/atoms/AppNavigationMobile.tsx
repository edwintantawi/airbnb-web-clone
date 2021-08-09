// icons
import { HeartIcon, SearchIcon, UserCircleIcon } from '@heroicons/react/outline';

const AppMobileNavigation = () => {
  return (
    <div className="fixed bottom-0 z-40 w-full h-16 bg-white border-t border-gray-200 md:hidden">
      <div className="grid grid-cols-3 items-center h-full max-w-[250px] sm:max-w-[350px] mx-auto">
        <div className="flex flex-col items-center px-3">
          <SearchIcon className="h-6 mr-1 text-primary" />
          <span className="mt-1 text-xs text-gray-500">Explore</span>
        </div>
        <div className="flex flex-col items-center px-3">
          <HeartIcon className="h-6 mr-1 text-gray-300 text-opacity-50" />
          <span className="mt-1 text-xs text-gray-500">Explore</span>
        </div>
        <div className="flex flex-col items-center px-3">
          <UserCircleIcon className="h-6 mr-1 text-gray-300 text-opacity-50" />
          <span className="mt-1 text-xs text-gray-500">Explore</span>
        </div>
      </div>
    </div>
  );
};

export default AppMobileNavigation;
