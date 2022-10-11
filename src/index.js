import React from 'react';
import ReactDOM from 'react-dom/client';
import styles from './index.module.css';
import App from './app';
import '@fortawesome/fontawesome-free/js/all.js';
import { Provider } from 'react-redux';
import store from './store';
import setAuthorizationToken from './service/setAuthorizationToken';

setAuthorizationToken(localStorage.getItem('jwtToken'));

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <div className={styles.container}>
      <App />
    </div>
  </Provider>
);
