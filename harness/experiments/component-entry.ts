// This module emits the isolated browser entry. It never imports the student's code in Node.
export function componentEntry(starter: string, exportName: string): string {
  return `
import React from 'react';
import { createRoot } from 'react-dom/client';
import { ${exportName} as Component } from ${JSON.stringify(starter)};
const root = createRoot(document.getElementById('preview'));
let renderId = 0;
let key = 0;
let props = {};
const send = (type, detail) => parent.postMessage({ channel: 'orzi-preview', type, detail }, '*');
const display = value => { try { return typeof value === 'string' ? value : JSON.stringify(value); } catch { return String(value); } };
let logCount = 0;
for (const name of ['log', 'info', 'warn', 'error']) {
  console[name] = (...values) => { if (logCount++ < 100) send('log', name + ': ' + values.map(display).join(' ').slice(0, 2000)); };
}
window.addEventListener('error', e => send('error', e.message));
window.addEventListener('unhandledrejection', e => send('error', String(e.reason)));
class Boundary extends React.Component {
  state = { error: null };
  static getDerivedStateFromError(error) { return { error: String(error) }; }
  componentDidCatch(error) { send('error', String(error)); }
  render() { return this.state.error ? React.createElement('p', { role: 'alert' }, this.state.error) : this.props.children; }
}
function Commit({ children, id }) {
  React.useEffect(() => { send('rendered', id); }, [id]);
  return children;
}
window.addEventListener('message', e => {
  if (e.source !== parent || e.data?.channel !== 'orzi-preview') return;
  if (e.data.type === 'render') {
    props = e.data.props;
    if (e.data.remount) key++;
    renderId++;
    root.render(React.createElement(Boundary, { key }, React.createElement(Commit, { id: renderId }, React.createElement(Component, props))));
  }
});
send('ready', null);
`;
}
