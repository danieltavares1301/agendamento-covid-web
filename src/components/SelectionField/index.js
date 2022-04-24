import { Field, ErrorMessage } from 'formik';
const SelectionField = ({ timesList = [], name }) => {
  return (
    <>
      <Field
        as="select"
        name={name}
        id={name}
        type="number"
        style={{ marginTop: 2, width: 80, marginBottom: 10, marginLeft: 5 }}
      >
        {timesList.map(item => (
          <option value={item} key={item}>
            {`${item}:00`}
          </option>
        ))}
      </Field>
      <ErrorMessage component="div" name={name} />
    </>
  );
};
export default SelectionField;
