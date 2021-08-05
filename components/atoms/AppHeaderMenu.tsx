import { FC, PropsWithChildren } from 'react';

interface AppHeaderProps extends PropsWithChildren<any> {
  active?: boolean;
}

const defaultProps: AppHeaderProps = {
  active: false,
};

const AppHeaderMenu: FC<AppHeaderProps> = ({ children, active }) => {
  return (
    <span
      className={`relative inline-block px-6 pt-1 pb-2 cursor-pointer after:absolute after:bottom-0 after:right-1/2 after:translate-x-1/2 ${
        active && 'after:w-5'
      } after:h-[2px] after:bg-white after:rounded-full ${!active && 'hover:after:w-1'}`}
    >
      {children}
    </span>
  );
};

AppHeaderMenu.defaultProps = defaultProps;

export default AppHeaderMenu;
