import React from "react";
import { getYear, getMonth } from "date-fns";
import DatePicker from "react-datepicker";
import { Field } from "formik";

const BirthDate = ({ name, value, onChange }) => {
  let years = new Array(116);

  // birth date range between 1906 and 2018 as the oldest person in the country
  // is 116 years old and the minimum vaccination age is 5 years.
  for (let i = 2019; i >= 1907; i--) {
    years[i] = getYear(new Date(i.toString()));
  }

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  return (
    <div>
      <label htmlFor="birthDate">Birth date</label>
      <Field name="birthDate" id="birthDate">
        {() => (
          <DatePicker
            renderCustomHeader={({
              date,
              changeYear,
              changeMonth,
              decreaseMonth,
              increaseMonth,
              prevMonthButtonDisabled,
              nextMonthButtonDisabled,
            }) => (
              <div
                style={{
                  margin: 10,
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <button
                  onClick={decreaseMonth}
                  disabled={prevMonthButtonDisabled}
                >
                  {"<"}
                </button>
                <select
                  value={getYear(date)}
                  onChange={({ target: { value } }) => changeYear(value)}
                >
                  {years.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>

                <select
                  value={months[getMonth(date)]}
                  onChange={({ target: { value } }) =>
                    changeMonth(months.indexOf(value))
                  }
                >
                  {months.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>

                <button
                  onClick={increaseMonth}
                  disabled={nextMonthButtonDisabled}
                >
                  {">"}
                </button>
              </div>
            )}
            selected={value}
            onChange={onChange}
            name={name}
          />
        )}
      </Field>
    </div>
  );
};

export default BirthDate;
