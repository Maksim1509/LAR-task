import React from 'react';
import Tasks from './Tasks';
import NewTaskForm from './NewTaskForm';

const App = () => (
  <>
    <h1>LAR TASK</h1>
    <main>
      <NewTaskForm />
      <Tasks />
    </main>
  </>
);

export default App;
