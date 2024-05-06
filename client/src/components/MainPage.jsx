import React, { useEffect, useState } from 'react';
import { TabsList } from './TabsList';
import Button from '@atlaskit/button';
import '../pages/Popup/Popup.css';
// import '../pages/Popup/index.css';
import TabsLists from './TabsLists';

export const MainPage = () => {
  const [tabsByWindows, setTabsByWindows] = useState([]);
  const [timerIsWorking, setTimerIsWorking] = useState(false);
  const [tabsByTime, setTabsByTime] = useState({});

  const getTimerIsWorking = async () => {
    const { timerIsWorking } = await chrome.storage.local.get([
      'timerIsWorking',
    ]);

    return !!timerIsWorking;
  };

  const getTabsByTime = () => {
    return chrome.storage.local.get(['tabsByTime']);
  };

  const setTimerState = async (newTimerIsWorking) => {
    setTimerIsWorking(newTimerIsWorking);

    await chrome.storage.local.set({
      timerIsWorking: newTimerIsWorking,
    });
  };

  const handleClick = () => {
    timerIsWorking
      ? chrome.runtime.sendMessage({ message: 'stop' })
      : chrome.runtime.sendMessage({ message: 'start' });

    setTimerState(!timerIsWorking);
  };

  const changeBodySize = () => {
    // document.body.style.width = '2300px';
    // document.body.style.height = '600px';
  };

  useEffect(() => {
    getTabsByTime().then((res) => {
      setTabsByTime(res.tabsByTime);
    });

    getTimerIsWorking().then((res) => {
      setTimerIsWorking(res);
    });
  }, []);

  useEffect(() => {
    chrome.tabs.query({}).then((tabs) => {
      const w = tabs.reduce((acc, tab) => {
        if (!acc[tab.windowId]) {
          acc[tab.windowId] = [];
        }

        acc[tab.windowId].push(tab);

        return acc;
      }, {});
      setTabsByWindows(w);
    });
  }, []);

  useEffect(() => {
    changeBodySize();
  });

  return (
    <div className="timeCounter">
      {Object.keys(tabsByWindows).map((wId) => {
        return (
          <p key={wId}>
            {`WindowId: ${wId}; Count:     ${tabsByWindows[wId].length};
                        Active: ${
                          tabsByWindows[wId].find((tab) => tab.active).id
                        }`}
          </p>
        );
      })}
      {/* Тут повинен передаватися props (App) */}
      <TabsLists tabs={tabsByTime} />
      <div>
        <Button
          appearance={timerIsWorking ? 'danger' : 'primary'}
          onClick={handleClick}
        >
          {timerIsWorking ? 'Stop' : 'Start'}
        </Button>
      </div>
    </div>
  );
};
