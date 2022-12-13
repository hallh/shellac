const init_tabs = [];

chrome.webNavigation.onBeforeNavigate.addListener(function(e) {
  logger(e);

  // Do not close frames
  if (e.frameId != 0) {
    return;
  }

  // Do not close chrome/brave pages
  if (e.url.match(/^(chrome|brave):\/\//)) {
    return;
  }

  // Ignore the first tab (assuming this is the app)
  if (init_tabs.length === 0) {
    init_tabs.push(e.tabId);
  }
  // Close all tabs attempting to navigate, except the first one
  else if (init_tabs.indexOf(e.tabId) < 0) {
    chrome.tabs.remove(e.tabId);
    logger(e.url);
    req('/', e.url);
  }
});
