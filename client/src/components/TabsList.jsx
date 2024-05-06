import React from 'react';
import '../pages/Popup/Popup.css';

export const TabsList = ({ tabs }) => {
  if (tabs) {
    return (
      <div className='tabsList'>
        {Object.keys(tabs).map((hostname) => {
          const { time } = tabs[hostname];
          return (
            <div key={hostname} className='tabInfo'>
              <div>{`hostname: ${hostname}`}</div>
              <div>{`${time} seconds`}</div>
            </div>
          );
        })}
      </div>
    );
  } else {
    return (
      <div>
        Waiting...
      </div>
    );
  }
};