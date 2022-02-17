import React, { useState } from 'react';
import useTasks from '../hooks/useTasks';
import Form from './addTaskStyles';

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
    <Form onSubmit={submitTask}>
      <label htmlFor="description">
        Tarefa
        <input
          type="text"
          value={description}
          onChange={({ target: { value } }) => setDescription(value)}
          id="description"
          data-testid="description-input"
          placeholder="Ir ao mercado"
        />
      </label>
      <label htmlFor="status">
        Status
        <select
          value={status}
          onChange={({ target: { value } }) => setStatus(value)}
          data-testid="status-input"
        >
          <option value="Pendente">Pendente</option>
          <option value="Em andamento">Em andamento</option>
          <option value="Pronto">Pronto</option>
        </select>
      </label>
      <button type="submit" data-testid="add-btn">
        Adicionar
      </button>
      <p data-testid="error-message">{errorMessage}</p>
    </Form>
  );
}

export default AddTask;
