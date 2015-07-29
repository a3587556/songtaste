
/*chrome.tabs.query({'active': true}, function (tabs) {
    var url = tabs[0].url;
	alert(url);
});*/
/*chrome.tabs.getSelected(null, function(tab) {
   alert(/s/);
});*/
/*chrome.browserAction.onClicked.addListener(function(tab) {

    var port = chrome.extension.connect({name: "Sample Communication"});
    port.postMessage("Hi BackGround");
    port.onMessage.addListener(function(msg) {
            console.log("message recieved"+ msg);
    });
	alert(/s/);
	console.log("message recieved"+ msg);

});*/

function checkForValidUrl(tabId, changeInfo, tab)
{
	if(changeInfo.status == "loading")
	{
		var url = tab.url;

		reg=/http:(.*)song\//;
		if(reg.test(url))
		{
			var sid = url.replace(reg, "");
			sid = sid.substr(0,sid.length-1);

			var req = new XMLHttpRequest();
	
			req.open("GET", "http://songtastec.coding.io/index.php?sid="+sid, false);
	
			req.send(null);	

			//alert(req.responseText);
			//g_SongUrl = req.responseText;
			//var views = chrome.extension.getViews({type: "popup"});
			//alert(views.length);
		
			/*for (var i = 0; i < views.length; i++) {
                views[i].document.getElementById("SongUrl").innerHTML= req.responseText;
			}	*/	
			chrome.storage.local.set({'sUrl': req.responseText}, function() {
			// Notify that we saved.
			//console.log('Settings saved');
			});
		}
		
		
	}
	
	if(changeInfo.status == "complete")
	{
		var url = tab.url;

		reg=/http:(.*)song\//;
		if(reg.test(url))
		{
			chrome.tabs.executeScript(tab.id, { file: 'jquery.min.js' }, function()
			{
				chrome.tabs.executeScript(tab.id, {file: 'content.js'});
			});
			
		}	
	}
};
	


chrome.tabs.onUpdated.addListener(checkForValidUrl);

chrome.extension.onMessage.addListener(function(request, sender, sendResponse)
{
	if(request.cmd == 'getSongUrl')
	{
		/*chrome.tabs.query({'active': true}, function (tabs,sndResponse) {
			/*var url = tabs[0].url;
			
			var sid = url.replace(reg, "");
			sid = sid.substr(0,sid.length-1);

			var req = new XMLHttpRequest();
	
			req.open("GET", "http://songtastec.coding.io/index.php?sid="+sid, false);
	
			req.send(null);

		
			
			alert(request.cmd);
			sendResponse({url: "test"});
		});*/
		chrome.storage.local.get('sUrl', function(data) {
			sendResponse({url: data.sUrl});
		});
		return true;
		
	}
	return false;
});

