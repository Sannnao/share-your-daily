import React, { useState, useEffect } from 'react';
import './input-area.scss';

const InputArea = React.forwardRef(({ addTask, existingValue }, ref) => {
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    if (existingValue)
      setInputValue(existingValue);
  }, [existingValue]);

  const handleInput = e => {
    setInputValue(e.target.value);
  };

	const moveSelectEnd = (e) => {
		e.target.selectionStart = e.target.value.length;
  };

  const applyValue = e => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (!inputValue) return;

      addTask(inputValue);
      setInputValue('');
    }
  };

  return (
    <textarea
      className='input-area'
      onChange={handleInput}
      value={inputValue}
      onKeyPress={applyValue}
			ref={ref}
			onFocus={moveSelectEnd}
    >
		</textarea>
  );
});

export default InputArea;
