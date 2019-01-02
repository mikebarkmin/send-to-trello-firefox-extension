function getHost(url) {
  var l = document.createElement('a');
  l.href = url;
  return l.host;
}

function addToTrello() {
  browser.tabs
    .query({ active: true, currentWindow: true })
    .then(tabInfos => {
      const tabInfo = tabInfos[0];
      const name = tabInfo.title;
      const url = tabInfo.url;
      const host = getHost(url);
      const desc = '';

      const trelloUrl =
        'https://trello.com/add-card' +
        '?source=' +
        host +
        '&mode=popup' +
        '&url=' +
        encodeURIComponent(url) +
        (name ? '&name=' + encodeURIComponent(name) : '') +
        (desc ? '&desc=' + encodeURIComponent(desc) : '');

      // set iframe
      /*
      const trelloFrame = document.getElementById('trelloFrame');
      trelloFrame.src = trelloUrl;
      */
      const newWindowConfig = {
        url: trelloUrl,
        type: 'popup',
        height: 600,
        width: 500
      };
      browser.windows.create(newWindowConfig);
    })
    .catch(error => console.log(error));
}

browser.browserAction.onClicked.addListener(addToTrello);
