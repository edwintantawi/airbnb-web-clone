import { FC, PropsWithChildren } from 'react';

interface IAppHeaderMenuItem extends PropsWithChildren<any> {
  active?: boolean;
  isSnap?: boolean;
  isActiveHeader?: boolean;
  onClick?: () => void;
}

const defaultProps: IAppHeaderMenuItem = {
  active: false,
};

const AppHeaderMenuItem: FC<IAppHeaderMenuItem> = ({
  children,
  active,
  isSnap,
  isActiveHeader,
  onClick,
}) => {
  const headerMenuBehavior = () => {
    let style = [];
    if (isSnap) style.push('text-white after:bg-white');
    if (!isSnap) style.push('text-gray-500 after:bg-gray-500');
    if (isActiveHeader) style.push('inline-block');
    if (!isActiveHeader) style.push('hidden');
    return style.join(' ');
  };

  return (
    <span
      className={`${headerMenuBehavior()} ${
        active ? 'after:w-5' : 'hover:after:w-1'
      } relative px-4 my-3 pb-2 cursor-pointer after:absolute after:bottom-0 after:right-1/2 after:translate-x-1/2 after:h-[2px] after:rounded-full`}
      onClick={onClick}
    >
      {children}
    </span>
  );
};

AppHeaderMenuItem.defaultProps = defaultProps;

export default AppHeaderMenuItem;
