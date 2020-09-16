import React from 'react';
import Item from '../Item/Item';
import InputArea from '../InputArea/InputArea';
import './section.scss';

const Section = ({
  sectionTitle,
  tasks,
  addTask,
  hadPlans,
  recallPlans,
  handleDelete,
  handleEdit,
	markAchieved,
	unmarkAchieved,
	sectionIndex,
	isUnfinishedTasks,
	addUnfinishedTasks,
	addedToPlans,
	cancelAddToPlans,
	hideAddedToPlans,
	handleDismiss,
}) => {

  console.log('render section', sectionTitle);

  return (
    <section className='section'>
      <h2 className='section__title'>{sectionTitle}:</h2>
      <ul className='section__items-list'>
        {tasks.map(({ text }) => {
          return <Item itemContent={text} />;
        })}
      </ul>
      <InputArea
        addTask={addTask}
      />
			{/* {isUnfinishedTasks
        && <div>You have unfinished tasks. Add them to Plans?
          <button onClick={addUnfinishedTasks}>Add</button>
          <button onClick={handleDismiss}>Dismiss</button>
        </div>
      }

			{addedToPlans
        && <div>
          <button onClick={cancelAddToPlans}>Cancel</button>
          <button onClick={hideAddedToPlans}>Hide</button>
        </div>
      }
      <InputArea
        applyValue={applyInputValue}
        handleInput={handleInput}
        inputValue={inputValue}
      />
      {hadPlans && (
        <button className='section__recall-btn' onClick={recallPlans}>
          Recall plans...
        </button>
      )} */}
    </section>
  );
};

export default React.memo(Section);
