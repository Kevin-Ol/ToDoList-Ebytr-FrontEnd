import React from 'react';
import AddTask from '../components/AddTask';
import TasksList from '../components/TasksList';
import Sorters from '../components/Sorters';
import { TasksContextProvider } from '../contexts/TasksContext';
import Main from './taskStyles';

function Task() {
  return (
    <Main>
      <TasksContextProvider>
        <h1>Lista de Tarefas</h1>
        <AddTask />
        <Sorters />
        <TasksList />
      </TasksContextProvider>
    </Main>
  );
}

export default Task;
