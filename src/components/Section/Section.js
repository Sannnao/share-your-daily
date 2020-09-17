import React from 'react';
import Item from '../Item/Item';
import InputArea from '../InputArea/InputArea';
import './section.scss';
import { PLANNED } from '../../constants/sectionNames';

const Section = ({
  sectionTitle,
  tasks,
  addTask,
  hadPlans,
  recallPlans,
  handleDelete,
  handleEdit,
  togglePlanned,
	markAchieved,
	unmarkAchieved,
	sectionIndex,
	addedToPlans,
	cancelAddToPlans,
	hideAddedToPlans,
}) => {

  console.log('render section', sectionTitle);

  return (
    <section className='section'>
      <h2 className='section__title'>{sectionTitle}:</h2>
      <ul className='section__items-list'>
        {tasks.map(({ id, text }) => {
          return (
            <Item
              key={id}
              taskId={id}
              itemContent={text}
              isPlanned={sectionTitle === PLANNED}
              handleEdit={handleEdit}
              handleDelete={handleDelete}
              markAchieved={markAchieved}
              unmarkAchieved={unmarkAchieved}
            />
          );
        })}
      </ul>
      <InputArea
        addTask={addTask}
      />
			{/*

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
