import React from 'react';

const DatePanel = ({ currentDate, setNewDate }) => (
  <input type='date' value={currentDate} onChange={setNewDate} />
);

export default DatePanel;
