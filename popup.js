chrome.tabs.query({'active': true}, function (tabs) {
    var url = tabs[0].url;
	//$("#SongUrl").html(url);
	//url=url.substring(0,url.Length-1);
	reg=/http:(.*)song\//;
	if(reg.test(url))
	{
		//$("#SongUrl").html("Loding...");
		/*var sid = url.replace(reg, "");
		sid = sid.substr(0,sid.length-1);

		var req = new XMLHttpRequest();
	
		req.open("GET", "http://songtastec.coding.io/index.php?sid="+sid, false);
	
		/*onreadystatechange = function() {
			if (req.readyState == 4) {
				// innerText does not let the attacker inject HTML elements.
				//document.getElementById("resp").innerText = xhr.responseText;
				console.log(req.responseText);
			}
		}*/	
		//req.send(null);	
		//alert(req.responseText);
		//$("#SongUrl").html(req.responseText);		
		//document.getElementById("SongUrl").innerHTML= req.responseText
		//chrome.extension.sendMessage({cmd: "getSongUrl"});
		chrome.storage.local.get('sUrl', function(data) {
			//console.log(data.sUrl);
			$("#SongUrl").html(data.sUrl)
		});
	}else {
		$("#Text").html("请在songtaste歌曲播放页面使用此插件！");
	}
	
	
	
});
