import React from 'react';
import useTasks from '../hooks/useTasks';
import TaskItem from './TaskItem';
import TaskLi from './taskItemStyles';

function TasksList() {
  const { tasksList, loading } = useTasks();

  if (loading) {
    return <h1>Carregando</h1>;
  }

  return (
    <ul>
      <TaskLi header>
        <span>Descrição</span>
        <span>Status</span>
        <span>Data</span>
        <span>Ações</span>
      </TaskLi>
      {tasksList.map(({
        description, status, createdAt, _id: id,
      }, index) => (
        <TaskItem
          key={id}
          id={id}
          description={description}
          status={status}
          createdAt={createdAt}
          index={index}
        />
      ))}
    </ul>
  );
}
export default TasksList;
