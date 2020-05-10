import React, { Fragment, useState, useEffect, useRef } from 'react';
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
	const inputRef = useRef(null);

	useEffect(() => {
		if (isEdit) {
			inputRef.current.focus();
		}
	}, [isEdit]);

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

	const insertLink = (value) => {
		const stringArr = value.split(' ');

		const newStringArr = stringArr.map(word => {
			const linkRegExp = /^https?:\/\//;
			const isLink = linkRegExp.test(word);

			if (isLink) {
				return <a href={word} target='__blank'>{ word }</a>
			}

			return word;
		})

		return newStringArr.map((word, i) => <Fragment key={i}>{word}{' '}</Fragment>);
	}

  return (
    <li className={clsx('item', { 'item--edit-mode': isEdit })}>
      {isEdit ? (
				<>
          <InputArea
            handleInput={handleInput}
            inputValue={inputValue}
            applyValue={handleEditTask}
						ref={inputRef}
          />
					<button onClick={disableEditMode} className='item__btn item__cancel-btn'>Cancel</button>
				</>
      ) : (
        <div className='item__content-container'>
          <p className='item__text-wrapper'>- {insertLink(itemContent)}</p>
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
        </div>
      )}
    </li>
  );
};

export default Item;
