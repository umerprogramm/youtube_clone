import React from 'react';
import ReactDOM from 'react-dom';
import { Elements } from '@stripe/react-stripe-js';
import stripePromise from '../src/stripe/stripe';
import App from './App';
import { Provider } from 'react-redux';
import { Store } from './store/store';

ReactDOM.render(
  <Elements stripe={stripePromise}>
    <Provider store={Store}>

    <App />
    </Provider>
  </Elements>,
  document.getElementById('root')
);
