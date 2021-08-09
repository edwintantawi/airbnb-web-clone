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
    <div className="py-4 overflow-hidden rounded-3xl">
      <DateRange
        ranges={[selectionRange]}
        onChange={handleDatePicker}
        months={2}
        direction="horizontal"
        showMonthAndYearPickers={false}
        rangeColors={['#F7F7F7']}
        minDate={new Date()}
        showDateDisplay={false}
        monthDisplayFormat="MMMM YYY"
      />
    </div>
  );
};

export default AppDateRange;
