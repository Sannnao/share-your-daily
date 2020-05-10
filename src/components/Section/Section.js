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
  applyValue,
  sectionIndex,
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
      <ul className='section__items-list'>
        {tasks.map(({ id, value }) => (
          <Item
            key={id}
            taskId={id}
            itemContent={value}
            handleDelete={handleDelete}
            handleEdit={handleEdit}
            sectionIndex={sectionIndex}
            applyValue={applyValue}
          />
        ))}
      </ul>
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
