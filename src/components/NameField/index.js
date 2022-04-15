import { Field, ErrorMessage } from "formik";
const NameField = () => (
  <div>
    <label htmlFor="name">Nome</label>
    <Field id="name" name="name" type="text" />
    <ErrorMessage component="div" name="name" />
  </div>
);

export default NameField;
