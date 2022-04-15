import DatePicker from "react-datepicker";
import setHours from "date-fns/setHours";
import setMinutes from "date-fns/setMinutes";
import { Field } from "formik";
//import { registerLocale } from "react-datepicker";
// import BR from "date-fns/locale/pt-BR";

const AppointmentDate = ({ value, onchange, list }) => {
  //registerLocale("BR", BR);
  return (
    <div>
      <label htmlFor="appointmentDate">Appointment</label>
      <Field name="appointmentDate" id="appointmentDate" type="text">
        {() => (
          <DatePicker
            showTimeSelect
            timeIntervals={60}
            name="appointmentDate"
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
