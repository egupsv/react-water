import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Full from './Full';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(<Full />, document.getElementById('root'));
serviceWorker.unregister();
