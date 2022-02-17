import React, { useState } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { IoCheckmarkDone, IoPlayCircleOutline } from 'react-icons/io5';
import { IoMdHourglass } from 'react-icons/io';
import { FiEdit } from 'react-icons/fi';
import { TiDeleteOutline } from 'react-icons/ti';
import { MdOutlineDone } from 'react-icons/md';
import useTasks from '../hooks/useTasks';
import TaskLi from './taskItemStyles';

function TaskItem({
  description, status, createdAt, id, index,
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
    <TaskLi status={status}>
      { !editMode && (
        <span data-testid={`task-description-${index}`}>{description}</span>
      )}

      { editMode && (
        <input
          type="text"
          value={editedDescription}
          autoFocus
          onChange={({ target: { value } }) => setEditedDescription(value)}
          id="description"
          data-testid={`task-description-input-${index}`}
        />
      )}
      <span data-testid={`task-status-${index}`}>{status}</span>
      <span data-testid={`task-date-${index}`}>
        {moment(createdAt).format('DD/MM/YYYY, HH:mm')}
      </span>
      <div>
        { !editMode && (
        <>
          <button
            type="button"
            onClick={() => changeStatus('Pronto')}
            data-testid={`ready-btn-${index}`}
            title="Pronto"
          >
            <IoCheckmarkDone />
          </button>
          <button
            type="button"
            onClick={() => changeStatus('Em andamento')}
            data-testid={`ongoing-btn-${index}`}
            title="Em andamento"
          >
            <IoPlayCircleOutline />
          </button>
          <button
            type="button"
            onClick={() => changeStatus('Pendente')}
            data-testid={`pending-btn-${index}`}
            title="Pendente"
          >
            <IoMdHourglass />
          </button>
          <button
            type="button"
            onClick={() => setEditMode(!editMode)}
            data-testid={`edit-btn-${index}`}
            title="Editar"
          >
            <FiEdit />
          </button>
          <button
            type="button"
            onClick={() => removeTask(id)}
            data-testid={`remove-btn-${index}`}
            title="Remover"
          >
            <TiDeleteOutline />
          </button>
        </>

        )}

        { editMode && (
        <button
          type="button"
          onClick={finishEdit}
          data-testid={`finish-btn-${index}`}
          title="Finalizar"
        >
          <MdOutlineDone />
        </button>
        )}
      </div>
    </TaskLi>
  );
}
export default TaskItem;

TaskItem.propTypes = {
  description: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
};
