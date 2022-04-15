import DatePicker, { registerLocale } from "react-datepicker";
import BR from "date-fns/locale/pt-BR";
import setHours from "date-fns/setHours";
import setMinutes from "date-fns/setMinutes";
import { Field } from "formik";

const AppointmentDate = ({ value, onchange, list }) => {
  registerLocale("BR", BR);
  return (
    <div>
      <label htmlFor="date">date</label>
      <Field name="date" id="date" type="text">
        {() => (
          <DatePicker
            showTimeSelect
            locale="BR"
            timeIntervals={60}
            name="date"
            selected={value}
            onChange={onchange}
            excludeTimes={list.map((item) =>
              setHours(setMinutes(new Date(), 0), item)
            )}
            dateFormat="Pp"
          />
        )}
      </Field>
    </div>
  );
};
export default AppointmentDate;
