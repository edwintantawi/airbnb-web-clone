import { FC, PropsWithChildren } from 'react';

interface IAppHeaderMenuItem extends PropsWithChildren<any> {
  active?: boolean;
  onClick?: () => void;
}

const defaultProps: IAppHeaderMenuItem = {
  active: false,
};

const AppHeaderMenuItem: FC<IAppHeaderMenuItem> = ({ children, active, onClick }) => {
  return (
    <span
      className={`relative inline-block px-4 my-3 pb-2 cursor-pointer after:absolute after:bottom-0 after:right-1/2 after:translate-x-1/2 ${
        active && 'after:w-5'
      } after:h-[2px] after:bg-white after:rounded-full ${!active && 'hover:after:w-1'}`}
      onClick={onClick}
    >
      {children}
    </span>
  );
};

AppHeaderMenuItem.defaultProps = defaultProps;

export default AppHeaderMenuItem;
