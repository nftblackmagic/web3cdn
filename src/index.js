import "./publicPath";
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { initButtonCheck } from './divCheck/buttonCheckTop';
import { Provider } from 'react-redux';
import { store } from './app/store';
import { SnackbarProvider } from "notistack";

const createDOMElement = () => {
  const body = document.getElementsByTagName('body')[0];
  const div = Object.assign(document.createElement('div'), {
    id: "root",
  });
  body.appendChild(div);
  return div;
}

export const renderAppContainer = () => {
  ReactDOM.render(
    <>
      <Provider store={store}>
        <SnackbarProvider
          maxSnack={3}
          autoHideDuration={3000}
          anchorOrigin={{
            vertical: "top",
            horizontal: "center",
          }}
        >
          <App />
        </SnackbarProvider>
      </Provider>
    </>, createDOMElement());
}

document.addEventListener("DOMContentLoaded", () => {
  renderAppContainer();
  initButtonCheck();
});

reportWebVitals();
