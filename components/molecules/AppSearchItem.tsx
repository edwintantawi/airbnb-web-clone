import React, { ChangeEvent, FC, FocusEvent, PropsWithChildren } from 'react';
// components
import IAppClearButton from '@/components/atoms/AppClearButton';
// icons
import { SearchIcon } from '@heroicons/react/outline';

interface IAppSearchItemProps extends PropsWithChildren<any> {
  relative?: boolean;
  withSearch?: boolean;
  separator?: boolean;
  isSearch?: boolean;
  type?: string;
  title: string;
  placeholder: string;
  active: boolean;
  value: any;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  onFocus: () => void;
  onBlur: (event: FocusEvent<HTMLElement>) => void;
  onClear: () => void;
  onSearch?: () => void;
}

const AppSearchItem: FC<IAppSearchItemProps> = ({
  relative,
  children,
  separator,
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
    <span
      role="button"
      tabIndex={0}
      className={`${
        active ? 'shadow-arround hover:bg-white' : 'hover:bg-gray-200 hover:bg-opacity-40'
      } ${relative && 'relative'} flex items-center rounded-full`}
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
      <IAppClearButton
        onClick={onClear}
        active={value}
        isFocus={active}
        separator={separator}
      />

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
      <div className={`${active ? 'block' : 'hidden'} mt-16`}>{children}</div>
    </span>
  );
};

export default AppSearchItem;
