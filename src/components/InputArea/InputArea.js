import React from 'react';
import './input-area.scss';

const InputArea = ({ applyValue, handleInput, inputValue }) => {
  return (
    <textarea
      className='input-area'
      onChange={handleInput}
      value={inputValue}
      onKeyPress={applyValue}
    ></textarea>
  );
};

export default InputArea;
