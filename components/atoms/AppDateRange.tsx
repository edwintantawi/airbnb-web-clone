import { DateRange } from 'react-date-range';
// context
import { DATA_ACTION_TYPES } from 'context/actionTypes';
import { useDataContext } from 'hooks/useDataContext';

const AppDateRange = () => {
  const [{ checkIn, checkOut }, dispatch] = useDataContext();

  const selectionRange = {
    startDate: checkIn,
    endDate: checkOut,
    key: 'selection',
  };

  const handleDatePicker = (range) => {
    const { startDate, endDate } = range.selection;
    dispatch({ type: DATA_ACTION_TYPES.SET_CHECK_IN, payload: startDate });
    dispatch({ type: DATA_ACTION_TYPES.SET_CHECK_OUT, payload: endDate });
  };

  return (
    <div
      className={`flex absolute left-0 right-0 searchbar:left-auto searchbar:right-1/2 searchbar:translate-x-1/2 px-4`}
    >
      <div className="rounded-3xl w-full searchbar:w-[850px] overflow-hidden shadow-arround-bold mt-3">
        <DateRange
          ranges={[selectionRange]}
          onChange={handleDatePicker}
          months={2}
          direction="horizontal"
          className="p-8"
          showMonthAndYearPickers={false}
          rangeColors={['#F7F7F7']}
          minDate={new Date()}
          showDateDisplay={false}
          monthDisplayFormat="MMMM YYY"
        />
      </div>
    </div>
  );
};

export default AppDateRange;
