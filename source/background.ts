import 'webext-dynamic-content-scripts';
import addDomainPermissionToggle from 'webext-domain-permission-toggle';
import './options-storage';

browser.runtime.onMessage.addListener((message, {tab}) => {
	if (message){
		if ( Array.isArray(message.openUrls)) {
			for (const [i, url] of (message.openUrls as string[]).entries()) {
				browser.tabs.create({
					url,
					index: tab!.index + i + 1,
					active: false
				});
			}
		}
		if ( Array.isArray(message.openTabs)) {
			debugger;
			for (const [i, url] of (message.openTabs as string[]).entries()) {
				chrome.tabs.query({}, function(tabs){
					console.log(tabs);
					console.log(i);
					console.log(url);
					for (let tabIndex in tabs) {
						// If tab url is same then focus
						if ("string" == typeof tabs[tabIndex].url && tabs[tabIndex].url == url) {
							let tabId = tabs[tabIndex].id || 0;
							chrome.tabs.update(tabId, {highlighted: true});
							return "found tab " + tabId;
						}
					}
					// // if no tabs open new
					// browser.tabs.create({
					// 	url,
					// 	index: tab!.index + i + 1,
					// 	active: true
					// });
				})
			}
			return "found no tabs";
		}
	}
});

// Give the browserAction a reason to exist other than "Enable RGH on this domain"
browser.browserAction.onClicked.addListener(() => {
	browser.tabs.create({
		url: 'https://github.com'
	});
});

browser.runtime.onInstalled.addListener(async ({reason}) => {
	// Only notify on install
	if (reason === 'install') {
		const self = await browser.management.getSelf();
		if (self && self.installType === 'development') {
			return;
		}

		browser.tabs.create({
			url: 'https://github.com/sindresorhus/refined-github/issues/1137',
			active: false
		});
	}
});

// GitHub Enterprise support
addDomainPermissionToggle();
