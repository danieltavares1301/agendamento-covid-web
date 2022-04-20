import React from "react";
import DatePicker from "react-datepicker";
import { Field } from "formik";
import "react-datepicker/dist/react-datepicker.css";

const DateField = ({ name, labelName, value, onChange }) => (
  <div>
    <label htmlFor={name}>{labelName}</label>
    <Field id={name} name={name}>
      {() => <DatePicker selected={value} onChange={onChange} name={name} />}
    </Field>
  </div>
);

export default DateField;
