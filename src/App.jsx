import React from 'react';
import AddTask from './components/AddTask';
import { TasksContextProvider } from './contexts/TasksContext';

function App() {
  return (
    <main>
      <TasksContextProvider>
        <AddTask />
      </TasksContextProvider>
    </main>
  );
}

export default App;
