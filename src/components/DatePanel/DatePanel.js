import React from 'react';

const DatePanel = ({ currentDate, setNewDate }) => (
  <input type='date' value={currentDate} onInput={setNewDate} />
);

export default DatePanel;
