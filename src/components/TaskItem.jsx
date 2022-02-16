import React from 'react';
import PropTypes from 'prop-types';

function TaskItem({ description, status, createdAt }) {
  return (
    <li>
      <span>{description}</span>
      <span>{status}</span>
      <span>{createdAt}</span>
    </li>
  );
}
export default TaskItem;

TaskItem.propTypes = {
  description: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
};
