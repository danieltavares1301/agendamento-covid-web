import { Field, ErrorMessage } from 'formik';

const NameField = ({ name, id }) => (
  <div>
    <Field id={id} name={name} type="text" />
    <ErrorMessage component="div" name={name} />
  </div>
);

export default NameField;
