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

describe('4 - Fluxo de edição de tarefas', () => {
  describe('Tarefas podem ser editadas corretamente', () => {
    beforeEach(async () => {
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
      ];
      
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

    it('É possível editar a descrição de uma tarefa', async () => {
      const { taskDescription, editBtn } = taskItemsElements(0);

      expect(axios.post).not.toHaveBeenCalled();
      expect(taskDescription).toHaveTextContent('Fazer compras');
      userEvent.click(editBtn);

      const { taskEditInput, finishBtn } = taskItemsElements(0);
      userEvent.clear(taskEditInput)
      userEvent.type(taskEditInput, 'Ir ao mercado');
      userEvent.click(finishBtn);

      await waitFor(() => {
        const { taskDescription: taskDescriptionEdited } = taskItemsElements(0);
        expect(taskDescriptionEdited).toHaveTextContent('Ir ao mercado');
      });
    });

    it('É possível mudar o status da tarefa para Em andamento', async () => {
      const { taskStatus, ongoingBtn } = taskItemsElements(0);

      expect(axios.post).not.toHaveBeenCalled();
      expect(taskStatus).toHaveTextContent('Pendente');
      userEvent.click(ongoingBtn);

      await waitFor(() => {
        const { taskStatus: taskStatusEdited } = taskItemsElements(0);
        expect(taskStatusEdited).toHaveTextContent('Em andamento');
      });
    });

    it('É possível mudar o status da tarefa para Pronto', async () => {
      const { taskStatus, readyBtn } = taskItemsElements(0);

      expect(axios.post).not.toHaveBeenCalled();
      expect(taskStatus).toHaveTextContent('Pendente');
      userEvent.click(readyBtn);

      await waitFor(() => {
        const { taskStatus: taskStatusEdited } = taskItemsElements(0);
        expect(taskStatusEdited).toHaveTextContent('Pronto');
      });
    });

    it('É possível mudar o status da tarefa para Pendente', async () => {
      const { taskStatus, pendingBtn } = taskItemsElements(1);

      expect(axios.post).not.toHaveBeenCalled();
      expect(taskStatus).toHaveTextContent('Em andamento');
      userEvent.click(pendingBtn);

      await waitFor(() => {
        const { taskStatus: taskStatusEdited } = taskItemsElements(0);
        expect(taskStatusEdited).toHaveTextContent('Pendente');
      });
    });
  });
});
