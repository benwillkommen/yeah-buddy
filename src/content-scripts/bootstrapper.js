$("body").append("<div id='yeahBuddyWrapper'></div>")
var templateUrl = chrome.extension.getURL("html/template.html");
$('#yeahBuddyWrapper').load(templateUrl, function(){
	$("#yeahBuddyDialog").dialog({
		appendTo: "#yeahBuddyWrapper",
		modal: true,
		autoOpen: false,
		dialogClass: "yeahBuddyModalWrapper",
		open: function(){
			$(".ui-widget-overlay").addClass("backgroundOverride");
		},
		close: function(){
			$(".ui-widget-overlay").removeClass("backgroundOverride");
		},
		width:900,
		height: 500,
		title: "Ain't nothin' but a peanut!"

	});
	$(".yeahBuddyTabs").tabs();

	//leaving view model in the global scope in case anyone wants to fart around with it in the console.
	window.doWhateverTheFuckYouWant = new yeahBuddyViewModel(); 
	ko.applyBindings(doWhateverTheFuckYouWant, document.getElementById("yeahBuddyWrapper"));
});