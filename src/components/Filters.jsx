import React from 'react';
import useTasks from '../hooks/useTasks';

function Filters() {
  const { sortBy } = useTasks();

  return (
    <div>
      <button
        type="button"
        onClick={() => sortBy('description')}
        data-testid="sort-description"
      >
        Descrição
      </button>
      <button
        type="button"
        onClick={() => sortBy('status')}
        data-testid="sort-status"
      >
        Status
      </button>
      <button
        type="button"
        onClick={() => sortBy('createdAt')}
        data-testid="sort-date"
      >
        Data
      </button>
    </div>

  );
}
export default Filters;
