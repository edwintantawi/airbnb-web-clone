import { ChangeEvent, FC } from 'react';
// icons
import { SearchIcon, XIcon } from '@heroicons/react/outline';

interface AppSearchItemProps {
  withSearch?: boolean;
  isSearch?: boolean;
  type?: string;
  title: string;
  placeholder: string;
  active: boolean;
  value: any;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  onFocus: () => void;
  onBlur: () => void;
  onClear: () => void;
  onSearch?: () => void;
}

const AppSearchItem: FC<AppSearchItemProps> = ({
  withSearch,
  isSearch,
  type,
  title,
  placeholder,
  active,
  value,
  onChange,
  onFocus,
  onBlur,
  onClear,
  onSearch,
}) => {
  return (
    <button
      className={`${
        active ? 'shadow-arround hover:bg-white' : 'hover:bg-gray-200 hover:bg-opacity-40'
      } flex items-center rounded-full`}
      onFocus={onFocus}
      onBlur={onBlur}
    >
      <div
        className={`${
          withSearch && 'min-w-[120px]'
        } flex flex-col flex-grow pl-7 pr-3 text-left`}
      >
        <span className="text-xs font-bold tracking-wider text-gray-500">{title}</span>
        {type === 'inputText' ? (
          <input
            type="text"
            value={value}
            onChange={onChange}
            onFocus={onFocus}
            placeholder={placeholder}
            className="w-full text-sm text-gray-500 placeholder-gray-300 bg-transparent outline-none"
          />
        ) : (
          <span className="text-sm text-gray-300">{value || placeholder}</span>
        )}
      </div>

      {/* clear icon */}
      <div
        className={`${!withSearch && 'border-r border-gray-200'} flex items-center h-8`}
      >
        <div
          role="button"
          tabIndex={0}
          className={`${
            active && value ? 'opacity-100' : 'opacity-0'
          } flex items-center pr-3`}
          onClick={onClear}
        >
          <XIcon className="h-6 p-1 bg-gray-200 rounded-full bg-opacity-60 hover:bg-opacity-100" />
        </div>
      </div>

      {withSearch && (
        <div
          role="button"
          tabIndex={0}
          className={`${
            isSearch ? 'w-auto saturate-200' : 'w-12'
          } flex items-center justify-center m-2 ml-0 px-3 h-12  rounded-full bg-primary  hover:saturate-200`}
          onClick={onSearch}
        >
          <SearchIcon className="h-5 text-white" />
          <span
            className={`${
              isSearch ? 'inline-block' : 'hidden'
            } ml-2 font-medium text-white`}
          >
            Search
          </span>
        </div>
      )}
    </button>
  );
};

export default AppSearchItem;
