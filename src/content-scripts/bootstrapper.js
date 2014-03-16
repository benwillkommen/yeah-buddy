$("body").append("<div id='yeahBuddyWrapper'></div>")
var templateUrl = chrome.extension.getURL("html/template.html");
$('#yeahBuddyWrapper').load(templateUrl);