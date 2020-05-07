import React, { useState } from 'react';
import clsx from 'clsx';
import './item.scss';

import InputArea from '../InputArea/InputArea';

const Item = ({
  itemContent,
  handleDelete,
  handleEdit,
  sectionIndex,
  taskId,
}) => {
  const [isEdit, setIsEdit] = useState(false);
  const [inputValue, setInputValue] = useState('');

  const handleInput = e => {
    setInputValue(e.target.value);
  };

  const handleDeleteTask = () => {
    handleDelete(sectionIndex, taskId);
  };

  const handleEditTask = e => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleEdit(sectionIndex, taskId, inputValue);

      setIsEdit(false);
      setInputValue('');
    }
  };

  const enableEditMode = () => {
    setIsEdit(true);
    setInputValue(itemContent);
	};

	const disableEditMode = () => {
		setIsEdit(false);
	}

  return (
    <li className={clsx('item', { 'item--edit-mode': isEdit })}>
      {isEdit ? (
				<>
          <InputArea
            handleInput={handleInput}
            inputValue={inputValue}
            applyValue={handleEditTask}
          />
					<button onClick={disableEditMode} className='item__btn item__cancel-btn'>Cancel</button>
				</>
      ) : (
        <>
          <span className='item__text-wrapper'>- {itemContent}</span>
          <div className='item__buttons-wrapper'>
            <button
              onClick={enableEditMode}
              className='item__btn item__edit-btn'
            >
              Edit
            </button>
            <button
              onClick={handleDeleteTask}
              className='item__btn item__del-btn'
            >
              X
            </button>
          </div>
        </>
      )}
    </li>
  );
};

export default Item;
