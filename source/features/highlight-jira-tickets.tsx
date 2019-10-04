import select from 'select-dom';
import features from '../libs/features';

function init(): void {
	const jiraRegex = /(ENG[-\s]\d+)/i;
	const titles = select.all('.commit-title,.gh-header-title');

	for (const title of titles) {
		const ticketMatch = new RegExp(jiraRegex).exec(title.innerHTML.trim());

		if (ticketMatch !== null) {
			const ticket = ticketMatch[1].replace(' ', '-');
			const ticketUrl = 'https://jira.bbthr.com/browse/' + ticket;
			const ticketLink = '<a target=\'_blank\' href=\'' + ticketUrl + '\'>' + ticket + '</a>';
			title.innerHTML = title.innerHTML.replace(ticketMatch[1], ticketLink);
		}
	}
}

features.add({
	id: __featureName__,
	description: 'make links to jira from tickets in titles',
	screenshot: false,
	load: features.onDomReady,
	init
});
