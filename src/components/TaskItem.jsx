import React from 'react';
import PropTypes from 'prop-types';
import useTasks from '../hooks/useTasks';

function TaskItem({
  description, status, createdAt, id,
}) {
  const { removeTask } = useTasks();

  return (
    <li>
      <span>{description}</span>
      <span>{status}</span>
      <span>{createdAt}</span>
      <button type="button" onClick={() => removeTask(id)}>Remover</button>
    </li>
  );
}
export default TaskItem;

TaskItem.propTypes = {
  description: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
};
