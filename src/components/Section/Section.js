import React from 'react';
import Item from '../Item/Item';
import InputArea from '../InputArea/InputArea';
import './section.scss';
import { PLANNED } from '../../constants/sectionNames';

const Section = ({
  sectionTitle,
  tasks,
  addTask,
  handleDelete,
  handleEdit,
	markAchieved,
	unmarkAchieved,
}) => {

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
    </section>
  );
};

export default React.memo(Section);
