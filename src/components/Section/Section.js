import React, { useState } from 'react';
import './section.scss';
import Item from '../Item/Item';
import InputArea from '../InputArea/InputArea';

const Section = ({
  sectionTitle,
  tasks,
  hadPlans,
  recallPlans,
  handleDelete,
  handleEdit,
	markAchieved,
	unmarkAchieved,
  applyValue,
	sectionIndex,
	isUnfinishedTasks,
	addUnfinishedTasks,
	addedToPlans,
	cancelAddToPlans,
	hideAddedToPlans,
	handleDismiss,
}) => {
  const [inputValue, setInputValue] = useState('');

  const handleInput = e => {
    setInputValue(e.target.value);
  };

  const applyInputValue = e => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (!inputValue) return;

      applyValue(inputValue, sectionIndex);
      setInputValue('');
    }
  };

  return (
    <section className='section'>
      <h2 className='section__title'>{sectionTitle}:</h2>
			{isUnfinishedTasks && <div>You have unfinished tasks. Add them to Plans?<button onClick={addUnfinishedTasks}>Add</button><button onClick={handleDismiss}>Dismiss</button></div>}
      <ul className='section__items-list'>
        {tasks.map(({ id, value }) => {
          const itemProps = {
            key: id,
            taskId: id,
            itemContent: value,
            handleDelete,
            handleEdit,
            sectionIndex,
            applyValue,
          };

          if (sectionTitle === 'Planned') {
            Object.assign(itemProps, {
              isPlanned: true,
              markAchieved,
							unmarkAchieved,
            });
          }

          return <Item {...itemProps} />;
        })}
      </ul>
			{addedToPlans && <div><button onClick={cancelAddToPlans}>Cancel</button><button onClick={hideAddedToPlans}>Hide</button></div>}
      <InputArea
        applyValue={applyInputValue}
        handleInput={handleInput}
        inputValue={inputValue}
      />
      {hadPlans && (
        <button className='section__recall-btn' onClick={recallPlans}>
          Recall plans...
        </button>
      )}
    </section>
  );
};

export default Section;
