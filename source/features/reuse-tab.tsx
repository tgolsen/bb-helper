// import select from 'select-dom';
import features from '../libs/features';
import delegate from 'delegate-it';

function init(): void {

	/**
	 * Have to ask the background page for this
	 * chrome.runtime.sendMessage to background.ts
	 * chrome.runtime.onMessage.addListener from there
	 * 	chrome.tabs.query({}, function(tabs){
	 * 		foreach tab
	 * 	    	if tab url is same then focus
	 * 	    		return
	 * 	    if no tabs open new
	 * 	})
	 */

	delegate('a', 'click', async (event) => {
		console.log("reuse tab");
		console.log(event);
		debugger;

		event.preventDefault();
		chrome.runtime.sendMessage(
			"",
			{
				openTabs: [event.target.href]
			},
			null,
			function(response) {
				debugger;
				event.preventDefault();
				console.log(response);
			}
		);

	});

	//
	//
	// chrome.tabs.query({currentWindow: true}, function (tabs) {
	// 	if (!tabs.length) return;
	//
	// 	// var listTextArea = document.getElementById("list");
	//
	// 	for (var i = 0; i < tabs.length; ++i) {
	// 		const msg = tabs[i].url + "\n";
	//
	// 		// listTextArea.value += tabs[i].url + "\n";
	// 		console.log(msg);
	// 	}
	//
	// 	// if (location.search != "?focusHack") location.search = "?focusHack";
	// 	// listTextArea.select();
	// });
	//

	// 	chrome.tabs.getAllInWindow(window.id, function(tabs){
	// 		if (!tabs.length) return;
	//
	// 		var listTextArea = document.getElementById("list");
	//
	// 		for (var i=0; i<tabs.length; ++i) {
	// 			listTextArea.value += tabs[i].url + "\n";
	// 		}
	//
	// 		if (location.search != "?focusHack") location.search = "?focusHack";
	// 		listTextArea.select();
	// 	});
	// });
	//
	// document.getElementById("openButton").addEventListener("click", openTextAreaList);
}

features.add({
	id: __featureName__,
	description: 'open existing tab if it has same url',
	screenshot: false,
	load: features.onDomReady,
	init
});
