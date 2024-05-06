import React, { useEffect, useState } from 'react';
import { MainPage } from '../../components/MainPage';
import { App } from '../../components/TabsLists';
import { Settings } from '../../components/Settings';
import './Popup.css';
import './index.css';


const Popup = () => {
  const [url, setUrl] = useState('');
  const [personalAccessToken, setPersonalAccessToken] = useState('');
  // const [isLoggedIn, setIsLoggedIn] = useState(false);
  // const [windowWidth, setWindowWidth] = useState(300);
  // const [windowHeight, setWindowHeight] = useState(260);

  const getDataFromStorage = (names) => {
    return chrome.storage.local.get(names);
  };

  useEffect(() => {
    getDataFromStorage(['url', 'personalAccessToken'])
      .then(({ url, personalAccessToken }) => {
        setUrl(url);
        setPersonalAccessToken(personalAccessToken);
        // setIsLoggedIn(checkLoginStatus());
        // setWindowSize(); 
      });
  }, []);

  const onFormSubmit = ({ url, personalAccessToken }) => {
    setUrl(url);
    setPersonalAccessToken(personalAccessToken);
    chrome.storage.local.set({
      url: url,
      personalAccessToken: personalAccessToken,
    });
    // setIsLoggedIn(true);
    // setWindowSize();
  };

  // const checkLoginStatus = () => {
  //   var isLoggedIn = localStorage.getItem('loggedIn');
  //   return isLoggedIn === 'true';
  // };

  // // Функція для встановлення розмірів вікна залежно від статусу логіну
  // const setWindowSize = () => {
  //   if (isLoggedIn) {
  //     setWindowWidth(2600);
  //     setWindowHeight(600);
  //   }
  // };

  return (
    <div className='App'>
      {
        url && personalAccessToken
        // isLoggedIn
          ? <MainPage />
          : <Settings onFormSubmit={onFormSubmit} />
      }
    </div>
  );
};

export default Popup;
