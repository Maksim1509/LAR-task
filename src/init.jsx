import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import localStore from 'store';
import reducer from './slices';
import App from './Components/App';

const run = () => {
  const localTasks = localStore.get('tasks');

  if (!localTasks) {
    localStore.set('tasks', [
      {
        id: 1, name: 'Сверстать', date: '2020-11-03', status: true,
      },
      {
        id: 2, name: 'Закодить', date: '2020-11-03', status: false,
      },
    ]);
  }

  const preloadedState = {
    tasksInfo: {
      tasks: localStore.get('tasks'),
      editing: null,
      hideComplited: false,
    },
  };

  const store = configureStore({ reducer, preloadedState });

  ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.getElementById('root'),
  );
};

export default run;
