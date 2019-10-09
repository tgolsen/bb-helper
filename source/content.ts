import select from 'select-dom';

import './content.css';
// import './features/highlight-jira-tickets';
// import './features/hotkey-jira-tickets';
// import './features/jira-fix-dates';
import './features/reuse-tab';

// Add global for easier debugging
// eslint-disable-next-line @typescript-eslint/no-explicit-any
(window as any).select = select;
