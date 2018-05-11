import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Page from './components/Page/Page';
import registerServiceWorker from './registerServiceWorker';
import 'font-awesome/css/font-awesome.min.css';

ReactDOM.render(<Page />, document.getElementById('root'));
registerServiceWorker();
