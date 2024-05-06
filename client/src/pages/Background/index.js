chrome.runtime.onMessage.addListener((res) => {
  if (res.message === 'start') {
    initCurrentActiveTab();

    chrome.tabs.onActivated.addListener(onActiveTabChange);
    chrome.windows.onFocusChanged.addListener(onWindowFocusChange);
  }

  if (res.message === 'stop') {
    chrome.tabs.onActivated.removeListener(onActiveTabChange);
    chrome.windows.onFocusChanged.removeListener(onWindowFocusChange);

    chrome.storage.local.clear();
  }
});

const onActiveTabChange = async () => {
  await timeUpdate();
  await initCurrentActiveTab();
};

const onWindowFocusChange = async (windowId) => {
  if (windowId === chrome.windows.WINDOW_ID_NONE) {
    visibilityCheck();
  } else {
    await timeUpdate();
    await initCurrentActiveTab();
  }
};

async function initCurrentActiveTab() {
  const currentWindow = await chrome.windows.getCurrent();
  const tab = await chrome.tabs.query({
    active: true,
    windowId: currentWindow.id,
  });
  const domain = (new URL(tab[0].url));
  const hostname = domain.hostname.replace(/.+\/\/|www.|\..+/g, '');
  const timeOfOpening = Date.now();
  const res = await chrome.storage.local.get(['tabsByTime']);
  const tabs = res.tabsByTime ?? {};
  const time = (res.tabsByTime && res.tabsByTime[hostname]?.time) || 0;

  tabs[hostname] = { tab, time, timeOfOpening };

  await chrome.storage.local.set({
    tabsByTime: tabs,
    lastVisited: hostname,
  });
}

async function timeUpdate() {
  const { tabsByTime, lastVisited } = await chrome.storage.local.get(['tabsByTime', 'lastVisited']);
  const timeOfOpening = tabsByTime[lastVisited].timeOfOpening;

  if (timeOfOpening !== 0) {
    const time = tabsByTime[lastVisited].time;
    const currentTime = Date.now();
    const sessionTime = Math.floor((currentTime - timeOfOpening) / 1000);

    tabsByTime[lastVisited].time = time + sessionTime;
    tabsByTime[lastVisited].timeOfOpening = 0;

    await chrome.storage.local.set({
      tabsByTime: tabsByTime,
    });
  }
}

async function visibilityCheck() {
  const { tabsByTime, lastVisited } = await chrome.storage.local.get(['tabsByTime', 'lastVisited']);
  chrome.scripting.executeScript({
    target: {
      tabId: tabsByTime[lastVisited].tab[0].id,
    },
    func: () => {
      return document.hidden;
    },
  })
    .then(injectionResults => {
      if (injectionResults[0].result) {
        timeUpdate();
      }
    });
}