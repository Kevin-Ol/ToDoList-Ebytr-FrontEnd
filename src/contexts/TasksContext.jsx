import React, {
  createContext, useCallback, useMemo, useEffect, useState,
} from 'react';
import PropTypes from 'prop-types';
import api from '../services/api';

export const TasksContext = createContext();

export function TasksContextProvider({ children }) {
  const [tasksList, setTasksList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(async () => {
    try {
      const { data } = await api.get('/tasks');

      setTasksList(data.tasks);
      setLoading(false);
    } catch (error) {
      setErrorMessage('Falha ao carregar tarefas');
    }
  }, []);

  const createTask = useCallback(async ({ description, status }) => {
    try {
      const createdAt = new Date();
      const { data } = await api.post('/tasks', { description, status, createdAt });

      setTasksList((oldList) => [...oldList, data.task]);
    } catch (error) {
      setErrorMessage('Houve um problema ao cadastrar a tarefa');
    }
  }, []);

  const value = useMemo(() => ({
    createTask,
    errorMessage,
    loading,
    tasksList,
  }), [createTask, errorMessage, loading, tasksList]);

  return (
    <TasksContext.Provider value={value}>
      {children}
    </TasksContext.Provider>
  );
}

TasksContextProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};
