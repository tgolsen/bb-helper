import features from '../libs/features';

function init() {
	document.append("<a href=\"https://valence-media.atlassian.net/browse/ENG-5469\" style=\"display:none\" data-hotkey=\"j t\">JIRA</a>")
}

features.add({
	id: __featureName__,
	description: 'Hotkeys to jump to Jira ticket',
	screenshot: false,
	exclude: [
		features.isGist
	],
	shortcuts: {
		'j t': 'Go to JIRA ticket'
	},
	init
});
