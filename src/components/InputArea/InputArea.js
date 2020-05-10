import React from 'react';
import './input-area.scss';

const InputArea = React.forwardRef(({ applyValue, handleInput, inputValue }, ref) => {
	const moveSelectEnd = (e) => {
		console.dir(e.target);
		e.target.selectionStart = e.target.value.length;
	}

  return (
    <textarea
      className={'input-area'}
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
