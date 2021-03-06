import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Home from './views/Home';
import registerServiceWorker from './registerServiceWorker';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-bootstrap-table/dist/react-bootstrap-table-all.min.css';

ReactDOM.render(<Home />, document.getElementById('root'));
registerServiceWorker();
