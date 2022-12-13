// chrome.tabs.onCreated.addListener(function(tab) {
//     console.log(tab);
//     console.log("oncreated");
//     /* tabs.onUpdated */
//     // chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab){
//     //     status = changeInfo.status;
//     // });
//     // while (status != 'complete'){
//     //     chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab){
//     //         status = changeInfo.status;
//     //     });
//     // }
//     // /* At this point, url tab is complete so I can capture it*/
// });


chrome.webNavigation.onBeforeNavigate.addListener(function(e) {
  logger(e);
  if (e.frameId != 0) {
    return;
  }

  chrome.tabs.remove(e.tabId);
  logger(e.url);
  req('/', e.url);

  // , {url: [{hostSuffix: 'google.com'},             {hostSuffix: 'google.com.au'}]}
});
