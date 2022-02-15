import { useContext } from 'react';
import { TasksContext } from '../contexts/TasksContext';

function useTasks() {
  const value = useContext(TasksContext);

  return value;
}

export default useTasks;
