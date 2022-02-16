import React from 'react';
import useTasks from '../hooks/useTasks';

function Filters() {
  const { sortBy } = useTasks();

  return (
    <div>
      <button type="button" onClick={() => sortBy('description')}>Descrição</button>
      <button type="button" onClick={() => sortBy('status')}>Status</button>
      <button type="button" onClick={() => sortBy('createdAt')}>Data</button>
    </div>

  );
}
export default Filters;
