import React, { useState, useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import { PLANNED, ACHIEVED, PLANS } from '../../constants/sectionNames';

const Result = ({
  currentDate,
  plannedTasks,
  achievedTasks,
  plansTasks,
}) => {
  const [isCopied, setIsCopied] = useState(false);
  const [dailyValue, setDailyValue] = useState(null);
  const resultRef = useRef(null);

  useEffect(() => {
    if (plansTasks.length) {
      window.localStorage.setItem('plans', JSON.stringify(plansTasks));
    }

    const dateArr = currentDate.split('-');
    dateArr.shift();

    const dailyValue = `${dateArr.reverse().join('.')}\n\n${PLANNED}\n\n${plannedTasks.map(({ text }) => `- ${text}`).join('\n')}\n\n${ACHIEVED}\n\n${achievedTasks.map(({ text }) => `- ${text}`).join('\n')}\n\n${PLANS}\n\n${plansTasks.map(({ text }) => `- ${text}`).join('\n')}
    `
    setDailyValue(dailyValue);
  }, []);

  const copyResultText = () => {
    resultRef.current.select();
    resultRef.current.setSelectionRange(0, 99999);

    document.execCommand('copy');
    window.getSelection().empty();

    setIsCopied(true);
  };

  return (
    <div className="result-container">
      <textarea
        className="result-field"
        value={dailyValue}
        readOnly
        ref={resultRef}
      ></textarea>
      <button
        className="result-container__copy-btn"
        onClick={copyResultText}
      >
        {isCopied ? 'Copied' : 'Copy'}
      </button>
    </div>
  );
};

const mapState = ({
  plannedTasks,
  achievedTasks,
  plansTasks,
}) => ({
  plannedTasks,
  achievedTasks,
  plansTasks,
});

export default connect(mapState, null)(Result);
