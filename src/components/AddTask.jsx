import React, { useState } from 'react';
import useTasks from '../hooks/useTasks';

function AddTask() {
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('Pendente');

  const { createTask, errorMessage } = useTasks();

  const submitTask = async (event) => {
    event.preventDefault();

    if (description) {
      await createTask({ description, status });

      setDescription('');
    }
  };

  return (
    <form onSubmit={submitTask}>
      <label htmlFor="description">
        Tarefa
        <input
          type="text"
          value={description}
          onChange={({ target: { value } }) => setDescription(value)}
          id="description"
        />
      </label>
      <select
        value={status}
        onChange={({ target: { value } }) => setStatus(value)}
      >
        <option value="Pendente">Pendente</option>
        <option value="Em andamento">Em andamento</option>
        <option value="Pronto">Pronto</option>
      </select>
      <button type="submit">
        Adicionar
      </button>
      <p>{errorMessage}</p>
    </form>
  );
}

export default AddTask;
