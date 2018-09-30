import React from 'react';
import ReactDOM from 'react-dom';
import 'jquery/dist/jquery.js';
import 'popper.js/dist/popper.js';
import 'bootstrap/dist/js/bootstrap.js';
import 'bootstrap/dist/css/bootstrap.css';
import './index.css';
import Routes from './components/routes.jsx';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<Routes/>, document.getElementById('root'));
registerServiceWorker();
