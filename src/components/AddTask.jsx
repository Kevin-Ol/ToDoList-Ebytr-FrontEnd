import React, { useState } from 'react';

function AddTask() {
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('Pendente');

  const submitTask = (event) => {
    event.preventDefault();
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
    </form>
  );
}

export default AddTask;
