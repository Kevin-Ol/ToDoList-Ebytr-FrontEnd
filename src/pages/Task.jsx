import React from 'react';
import AddTask from '../components/AddTask';
import TasksList from '../components/TasksList';
import Filters from '../components/Filters';
import { TasksContextProvider } from '../contexts/TasksContext';
import Main from './taskStyles';

function Task() {
  return (
    <Main>
      <TasksContextProvider>
        <h1>Lista de Tarefas</h1>
        <AddTask />
        <Filters />
        <TasksList />
      </TasksContextProvider>
    </Main>
  );
}

export default Task;
