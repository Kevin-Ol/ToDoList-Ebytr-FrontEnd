import React from 'react';
import AddTask from './components/AddTask';
import TasksList from './components/TasksList';
import Filters from './components/Filters';
import { TasksContextProvider } from './contexts/TasksContext';

function App() {
  return (
    <main>
      <TasksContextProvider>
        <AddTask />
        <Filters />
        <TasksList />
      </TasksContextProvider>
    </main>
  );
}

export default App;
