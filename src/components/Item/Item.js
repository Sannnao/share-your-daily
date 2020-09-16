import React, { Fragment, useState, useEffect, useRef } from 'react';
import clsx from 'clsx';
import './item.scss';

import InputArea from '../InputArea/InputArea';

const Item = ({
  itemContent,
  // handleDelete,
  handleEdit,
  // markAchieved,
  // unmarkAchieved,
  // sectionIndex,
  taskId,
  isPlanned,
}) => {
  const [isEdit, setIsEdit] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    if (isEdit) {
      inputRef.current.focus();
    }
  }, [isEdit]);

  // const handleDeleteTask = () => {
  //   handleDelete(sectionIndex, taskId);
  // };

  const handleEditTask = value => {
    handleEdit(taskId, value);

    setIsEdit(false);
  };

  const enableEditMode = () => {
    setIsEdit(true);
  };

  const disableEditMode = () => {
    setIsEdit(false);
  };

  const insertLink = value => {
    const stringArr = value.split(' ');

    const newStringArr = stringArr.map(word => {
      const linkRegExp = /^https?:\/\//;
      const isLink = linkRegExp.test(word);

      if (isLink) {
        return (
          <a href={word} target='__blank'>
            {word}
          </a>
        );
      }

      return word;
    });

    return newStringArr.map((word, i) => <Fragment key={i}>{word} </Fragment>);
  };

  // const toggleAchievedTask = e => {
  //   if (e.target.checked) {
  //     markAchieved(taskId);
  //   } else {
  //     unmarkAchieved(taskId);
  //   }
  // };

  console.log(taskId);

  return (
    <li className={clsx('item', { 'item--edit-mode': isEdit })}>
    {isEdit
      ?  <>
          <InputArea
            addTask={handleEditTask}
            existingValue={itemContent}
            ref={inputRef}
          />
          <button
            onClick={disableEditMode}
            className='item__btn item__cancel-btn'
          >
            Cancel
          </button>
        </>
      : <div className='item__content-container'>
          <p className='item__text-wrapper'>- {insertLink(itemContent)}</p>
          <div className='item__buttons-wrapper'>
            <button
              onClick={enableEditMode}
              className='item__btn item__edit-btn'
            >
              Edit
            </button>
          </div>
        </div>
      /* {isEdit ? (
        <>
          <InputArea
            handleInput={handleInput}
            inputValue={inputValue}
            applyValue={handleEditTask}
            ref={inputRef}
          />
          <button
            onClick={disableEditMode}
            className='item__btn item__cancel-btn'
          >
            Cancel
          </button>
        </>
      ) : (
        <div className='item__content-container'>
          {isPlanned && (
            <input
              type='checkbox'
              className='item__checkbox'
              onChange={toggleAchievedTask}
            />
          )}
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
      )} */
      }
    </li>
  );
};

export default Item;
