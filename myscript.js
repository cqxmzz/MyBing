chrome.storage.local.get('img', function(result) {
	if (result.img != null)
		document.getElementById("bgDiv").style.backgroundImage = "url('" + result.img + "')";
});

$( ".sh_hs" ).remove();
$( ".sh_hst" ).remove();
$('#sh_rdiv').remove();
$('#hp_vidwrp').remove();
$('#vid').remove();

var value;
chrome.storage.local.get('value', function(result) {
	value = result.value;
});

chrome.storage.local.get('date', function(result) {
	var d = new Date();
	var n = d.getDate();
	if (result.date != n)
		loadXMLDoc();
});

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
	var query = value;
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
	var d = new Date();
	var n = d.getDate();
	chrome.storage.local.set({'date': n}, function() {
	});

	chrome.storage.local.set({'img': imgLink}, function() {
	});

	chrome.tabs.getSelected(null, function(tab) {
		chrome.tabs.reload(tab.id);
	});
}