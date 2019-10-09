// import select from 'select-dom';
import features from '../libs/features';

function init(): void {
	console.log("reuse tab");

	chrome.windows.getCurrent(function () {
		chrome.tabs.query({currentWindow: true}, function (tabs) {
			if (!tabs.length) return;

			// var listTextArea = document.getElementById("list");

			for (var i = 0; i < tabs.length; ++i) {
				const msg = tabs[i].url + "\n";

				// listTextArea.value += tabs[i].url + "\n";
				console.log(msg);
			}

			// if (location.search != "?focusHack") location.search = "?focusHack";
			// listTextArea.select();
		});


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
	});
}

features.add({
	id: __featureName__,
	description: 'open existing tab if it has same url',
	screenshot: false,
	load: features.onDomReady,
	init
});
