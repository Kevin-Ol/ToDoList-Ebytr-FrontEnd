import React, { useState } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import useTasks from '../hooks/useTasks';

function TaskItem({
  description, status, createdAt, id,
}) {
  const { removeTask, editTask, editStatus } = useTasks();
  const [editMode, setEditMode] = useState(false);
  const [editedDescription, setEditedDescription] = useState(description);

  const finishEdit = async () => {
    await editTask(id, editedDescription);
    setEditMode(!editMode);
  };

  const changeStatus = async (newStatus) => {
    await editStatus(id, newStatus);
  };

  return (
    <li>
      { !editMode && (
        <span>{description}</span>
      )}

      { editMode && (
        <input
          type="text"
          value={editedDescription}
          autoFocus
          onChange={({ target: { value } }) => setEditedDescription(value)}
          id="description"
        />
      )}
      <span>{status}</span>
      <span>{moment(createdAt).format('DD/MM/YYYY, HH:mm')}</span>
      { !editMode && (
        <>
          <button type="button" onClick={() => changeStatus('Pronto')}>Pronto</button>
          <button type="button" onClick={() => changeStatus('Em andamento')}>Em andamento</button>
          <button type="button" onClick={() => changeStatus('Pendente')}>Pendente</button>
          <button type="button" onClick={() => setEditMode(!editMode)}>Editar</button>
          <button type="button" onClick={() => removeTask(id)}>Remover</button>
        </>

      )}

      { editMode && (
      <button type="button" onClick={finishEdit}>Finalizar</button>
      )}
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
