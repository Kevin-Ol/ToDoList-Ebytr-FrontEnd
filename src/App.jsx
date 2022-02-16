import React from 'react';
import AddTask from './components/AddTask';
import TasksList from './components/TasksList';
import { TasksContextProvider } from './contexts/TasksContext';

function App() {
  return (
    <main>
      <TasksContextProvider>
        <AddTask />
        <TasksList />
      </TasksContextProvider>
    </main>
  );
}

export default App;
