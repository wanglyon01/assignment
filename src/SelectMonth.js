import React, { useState } from "react";

function SelectMonth(props) {
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
    "December"
  ];
  const [currentMonth, setCurrentMonth] = useState();

  const changeMonth = (newMonth) => {
    setCurrentMonth(newMonth);
    props.getMonth(newMonth);
    console.log(currentMonth);
  };

  return (
    <form>
      <select
        onChange={(event) => changeMonth(event.target.value)}
        value={currentMonth}
      >
        {months.map((month) => (
          <option value={month}>{month}</option>
        ))}
      </select>
    </form>
  );
}

export default SelectMonth;
