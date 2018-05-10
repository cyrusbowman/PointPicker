import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Page from './page';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<Page />, document.getElementById('container'));
registerServiceWorker();
