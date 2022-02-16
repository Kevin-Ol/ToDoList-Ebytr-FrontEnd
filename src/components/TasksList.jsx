import React from 'react';
import useTasks from '../hooks/useTasks';
import TaskItem from './TaskItem';

function TasksList() {
  const { tasksList, loading } = useTasks();

  if (loading) {
    return <h1>Carregando</h1>;
  }

  return (
    <ul>
      {tasksList.map(({
        description, status, createdAt, _id: id,
      }) => (
        <TaskItem
          key={id}
          description={description}
          status={status}
          createdAt={createdAt}
        />
      ))}
    </ul>
  );
}
export default TasksList;
