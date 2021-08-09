import { FC } from 'react';
// icons
import { XIcon } from '@heroicons/react/outline';

interface AppClearButtonProps {
  active: boolean;
  isFocus?: boolean;
  separator?: boolean;
  onClick: () => void;
}

const defaultProps = {
  isFocus: true,
  separator: false,
};

const AppClearButtonProps: FC<AppClearButtonProps> = ({
  onClick,
  active,
  isFocus,
  separator,
}) => {
  return (
    <div className={`${separator && 'border-r border-gray-200'} flex items-center h-8`}>
      <div
        role="button"
        tabIndex={0}
        className={`${
          active && isFocus ? 'opacity-100' : 'opacity-0'
        } flex items-center pr-3`}
        onClick={onClick}
      >
        <XIcon className="h-6 p-1 bg-gray-200 rounded-full bg-opacity-60 hover:bg-opacity-100" />
      </div>
    </div>
  );
};

AppClearButtonProps.defaultProps = defaultProps;

export default AppClearButtonProps;
