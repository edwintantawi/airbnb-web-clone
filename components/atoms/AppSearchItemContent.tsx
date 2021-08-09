const AppSearchItemContent = ({ className, children }) => {
  return (
    <div
      className={`${className} absolute px-8 py-4 mt-3 bg-white rounded-3xl shadow-arround-bold`}
    >
      {children}
    </div>
  );
};

export default AppSearchItemContent;
