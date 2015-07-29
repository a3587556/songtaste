
//$(".song_left img").remove();

chrome.extension.sendMessage({cmd: "getSongUrl"},function(response) { 
	$("img[src$='songa.jpg']").replaceWith('<audio src="'+response.url+'" autoplay="true" controls="true" loop="loop"></audio>');
});