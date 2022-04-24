import React from 'react';
import DatePicker from 'react-datepicker';
import { ErrorMessage, Field } from 'formik';
import 'react-datepicker/dist/react-datepicker.css';

const DateField = ({ name, value, onChange, onBlur }) => (
  <>
    <Field id={name} name={name}>
      {() => (
        <DatePicker
          selected={value}
          onChange={onChange}
          name={name}
          dateFormat="dd/MM/yyyy"
          onBlur={onBlur}
        />
      )}
    </Field>
    <ErrorMessage component="div" name={name} />
  </>
);

export default DateField;
