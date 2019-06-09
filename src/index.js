import 'bootstrap/dist/css/bootstrap.css';
import React from 'react';
import ReactDOM from 'react-dom';
import Calculator from './Calculator';
import * as serviceWorker from './serviceWorker';
import './index.css';

ReactDOM.render(<Calculator />, document.getElementById('root'));

serviceWorker.unregister();
