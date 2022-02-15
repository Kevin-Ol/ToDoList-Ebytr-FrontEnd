import React, {
  createContext, useCallback, useMemo,
} from 'react';
import PropTypes from 'prop-types';
import api from '../services/api';

export const TasksContext = createContext();

export function TasksContextProvider({ children }) {
  const createTask = useCallback(async ({ description, status, createdAt }) => {
    await api.post('/tasks', { description, status, createdAt });
  }, []);

  const value = useMemo(() => ({
    createTask,
  }), [createTask]);

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
