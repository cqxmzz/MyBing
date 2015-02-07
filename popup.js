document.addEventListener('DOMContentLoaded', function() {
	chrome.storage.local.get('value', function(result) {
		var query = document.getElementById('text').value = result.value;
	});
	document.getElementById("submit").addEventListener('click', handler);
});
function handler() {
  loadXMLDoc();
}

function getRandomInt (min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

function loadXMLDoc()
{
	var xmlhttp;
	xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange=function()
	{
		if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
			var jsonstr = xmlhttp.responseText;
			var jsonobj = JSON.parse(jsonstr);
			var link = jsonobj.d.results[0].MediaUrl;
			sendValue(link);
		} else {
			//sendValue(xmlhttp.responseText);
		}
	}
	var query = document.getElementById('text').value;
	var num = getRandomInt (0, 100);
	var requestStr = "https://api.datamarket.azure.com/Bing/Search/v1/News?Query=%27Oracle%27&$skip=100&$format=json";
			xmlhttp.open("Get", requestStr, true);
	var requestStr = "https://api.datamarket.azure.com/Bing/Search/Image?Query=%27wallpaper%20" 
										+ query + "%27&ImageFilters=%27Size:Large%27&$format=json&$top=1&$skip=" + num;
	xmlhttp.open("Get", requestStr, true);
	xmlhttp.setRequestHeader('Authorization', 'Basic ' + btoa(':moR8jQXGzTehpR2NklGiMB6aOzMfgYV8SSWe5Mo/lDE'));
	xmlhttp.send();
}

function sendValue(imgLink) {
	var x = document.getElementById("text").value;
	chrome.storage.local.set({'value': x}, function() {
 	});
	var d = new Date();
	var n = d.getDate();
	chrome.storage.local.set({'date': n}, function() {
	});

	chrome.storage.local.set({'img': imgLink}, function() {
	});

	chrome.tabs.getSelected(null, function(tab) {
	if (tab.url == "http://www.bing.com/")
		chrome.tabs.reload(tab.id);
	});
}
