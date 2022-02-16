import React from 'react';
import axios from 'axios';
import '@testing-library/jest-dom';
import { screen, waitFor, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';

jest.mock('axios', () => ({
  create: jest.fn().mockReturnThis(),
  get: jest.fn(() => Promise.resolve()),
  post: jest.fn(() => Promise.resolve()),
  delete: jest.fn(() => Promise.resolve()),
  put: jest.fn(() => Promise.resolve()),
}));

const formElements = () => {
  const descriptionInput = screen.getByTestId('description-input');
  const statusInput = screen.getByTestId('status-input');
  const addBtn = screen.getByTestId('add-btn');

  return { descriptionInput, statusInput, addBtn };
};

const taskItemsElements = (index) => {
  const taskDescription = screen.queryByTestId(`task-description-${index}`);
  const taskEditInput = screen.queryByTestId(`task-description-input-${index}`);
  const taskStatus = screen.queryByTestId(`task-status-${index}`);
  const taskDate = screen.queryByTestId(`task-date-${index}`);
  const readyBtn = screen.queryByTestId(`ready-btn-${index}`);
  const ongoingBtn = screen.queryByTestId(`ongoing-btn-${index}`);
  const pendingBtn = screen.queryByTestId(`pending-btn-${index}`);
  const editBtn = screen.queryByTestId(`edit-btn-${index}`);
  const removeBtn = screen.queryByTestId(`remove-btn-${index}`);
  const finishBtn = screen.queryByTestId(`finish-btn-${index}`);


  return {
    taskDescription,
    taskEditInput,
    taskDate,
    taskStatus,
    readyBtn,
    ongoingBtn,
    pendingBtn,
    editBtn,
    removeBtn,
    finishBtn 
  };
};

describe('3 - Remoção de tarefas', () => {
  const tasks = [
    {
      _id: "620d6cfe82fa814f0868e3e8",
      description: "Fazer compras",
      status: "Pendente",
      createdAt: "2022-02-15T15:42:03.596Z"
    },
    {
      _id: "620d6cfe82fa814f0868e3e9",
      description: "Limpar o quarto",
      status: "Em andamento",
      createdAt: "2022-02-16T11:07:54.596Z"
    },
    {
      _id: "620d6cfe82fa814f0868e3ea",
      description: "Consertar carro",
      status: "Pendente",
      createdAt: "2022-02-16T21:30:38.596Z"
    },
    {
      _id: "620d6cfe82fa814f0868e3eb",
      description: "Lavar bicicleta",
      status: "Pronto",
      createdAt: "2022-02-14T17:12:21.596Z"
    },
  ]

  describe('Remove item da lista de tarefas corretamente', () => {
    beforeEach(async () => {
      axios.get.mockImplementationOnce(() =>
        Promise.resolve({ data: { tasks } }),
      );

      render(<App />);
    
      await waitFor(() => {
        expect(screen.queryByText("Carregando")).toBe(null);
      });
    });

    afterEach(() => {
      jest.clearAllMocks()
    });

    it('Todas tarefas possuem descrição, status, data, botões para mudança de estado, botão de edição e botão de remoção', async () => {
      const {     
        taskDescription,
        taskStatus,
        taskDate,
        readyBtn,
        ongoingBtn,
        pendingBtn,
        editBtn,
        removeBtn,  } = taskItemsElements(0);

      expect(axios.post).not.toHaveBeenCalled();
      userEvent.click(removeBtn);

      await waitFor(() => {
        expect(taskDescription).not.toBeInTheDocument();
        expect(taskStatus).not.toBeInTheDocument();
        expect(taskDate).not.toBeInTheDocument();
        expect(readyBtn).not.toBeInTheDocument();
        expect(ongoingBtn).not.toBeInTheDocument();
        expect(pendingBtn).not.toBeInTheDocument();
        expect(editBtn).not.toBeInTheDocument();
        expect(removeBtn).not.toBeInTheDocument();
      });
    });
  });
});
