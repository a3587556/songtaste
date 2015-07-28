function checkForValidUrl(tabId, changeInfo, tab) {
	alert(/s1/);
};

chrome.tabs.onActivated.addListener(checkForValidUrl);

chrome.tabs.query({'active': true}, function (tabs) {
    var url = tabs[0].url;
	alert(/s2/);
});