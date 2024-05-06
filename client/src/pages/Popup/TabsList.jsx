import React from 'react';

export const TabsList = ({ tabs }) => {
  if (tabs) {
    return (
      <ul>
        {Object.keys(tabs).map((tabId) => {
          const { time } = tabs[tabId];

          return (
            <li key={tabId}>
              {`Tab Id: ${tabId} Spent time ${time}`}
            </li>
          );
        })}
      </ul>
    );
  } else {
    return (
      <div>
        Waiting...
      </div>
    )
  }
};
