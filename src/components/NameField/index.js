import { Field, ErrorMessage } from "formik";

const NameField = ({ labelName, name, id }) => (
  <div>
    <label htmlFor={name}>{labelName}</label>
    <br />
    <Field id={id} name={name} type="text" />
    <ErrorMessage component="div" name={name} />
  </div>
);

export default NameField;
