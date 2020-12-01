import React, { useState } from 'react';
import TimePicker from 'react-time-picker';
 
function HourPicker() {
  const [value, onChange] = useState("10:00");
 
  return (
    <div>
      <TimePicker
        onChange={onChange}
        value={value}
        maxDetail={"hour"}
        minTime={'00:00'}
        maxTime={'23:00'}
      />
    </div>
  );
}

export default HourPicker