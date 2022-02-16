import React from 'react';
import axios from 'axios';
import '@testing-library/jest-dom';
import { screen, waitFor, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import moment from 'moment';

jest.mock('axios', () => ({
  create: jest.fn().mockReturnThis(),
  get: jest.fn(() => Promise.resolve()),
  post: jest.fn(() => Promise.resolve()),
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

describe('1 - Fluxo para adicionar nova tarefa', () => {
  describe('Não é possível adicionar tarefa sem descrição', () => {
    beforeEach(async () => {
      axios.get.mockImplementationOnce(() =>
        Promise.resolve({ data: { tasks: [] } }),
      );

      render(<App />);
    
      await waitFor(() => {
        expect(screen.queryByText("Carregando")).toBe(null);
      });
    });

    afterEach(() => {
      jest.clearAllMocks()
    });

    it('Ao clicar no botão sem inserir uma descrição, nenhuma tarefa é adicionada', async () => {
      const { addBtn } = formElements();

      userEvent.click(addBtn);

      const { taskDate } = taskItemsElements(0);

      expect(axios.post).not.toHaveBeenCalled();
      expect(taskDate).not.toBeInTheDocument();
    });
  });

  describe('É possível adicionar tarefas', () => {
    beforeEach(async () => {
      axios.get.mockImplementationOnce(() =>
        Promise.resolve({ data: { tasks: [] } }),
      );

      render(<App />);
    
      await waitFor(() => {
        expect(screen.queryByText("Carregando")).toBe(null);
      });
    });

    afterEach(() => {
      jest.clearAllMocks()
    });

    it('É possível adicionar tarefa com status Pendente', async () => {
      const { descriptionInput, addBtn } = formElements();

      userEvent.type(descriptionInput, 'Fazer compras');
      userEvent.click(addBtn);


      expect(axios.post).toHaveBeenCalledTimes(1);

      waitFor(() => {
        const { taskDescription, taskStatus } = taskItemsElements(0);
        expect(taskDescription).toHaveTextContent('Fazer compras');
        expect(taskStatus).toHaveTextContent('Pendente');
      });
    });

    it('É possível adicionar tarefa com status Em andamento', async () => {
      const { descriptionInput, statusInput, addBtn } = formElements();

      userEvent.type(descriptionInput, 'Fazer compras');
      userEvent.selectOptions(statusInput, 'Em andamento');
      userEvent.click(addBtn);


      expect(axios.post).toHaveBeenCalledTimes(1);

      waitFor(() => {
        const { taskDescription, taskStatus } = taskItemsElements(0);
        expect(taskDescription).toHaveTextContent('Fazer compras');
        expect(taskStatus).toHaveTextContent('Em andamento');
      });
    });

    it('É possível adicionar tarefa com status Pronto', async () => {
      const { descriptionInput, statusInput, addBtn } = formElements();

      userEvent.type(descriptionInput, 'Fazer compras');
      userEvent.selectOptions(statusInput, 'Pronto');

      userEvent.click(addBtn);


      expect(axios.post).toHaveBeenCalledTimes(1);

      waitFor(() => {
        const { taskDescription, taskStatus } = taskItemsElements(0);
        expect(taskDescription).toHaveTextContent('Fazer compras');
        expect(taskStatus).toHaveTextContent('Pronto');
      });
    });
  });
});

describe('2 - Renderização de tarefas', () => {
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

  describe('Renderiza todas os itens das tarefas corretamente', () => {
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

    it('Todas tarefas possuem descrição, status, data, botões para mudança de estado, botão de edição e botão de remoção', () => {
      for (let index = 0; index < tasks.length; index += 1) {
        const {     
          taskDescription,
          taskStatus,
          taskDate,
          readyBtn,
          ongoingBtn,
          pendingBtn,
          editBtn,
          removeBtn,  } = taskItemsElements(index);

        expect(axios.post).not.toHaveBeenCalled();
        expect(taskDescription).toHaveTextContent(tasks[index].description);
        expect(taskStatus).toHaveTextContent(tasks[index].status);
        expect(taskDate).toHaveTextContent(moment(tasks[index].createdAt).format('DD/MM/YYYY, HH:mm'));
        expect(readyBtn).toBeInTheDocument();
        expect(ongoingBtn).toBeInTheDocument();
        expect(pendingBtn).toBeInTheDocument();
        expect(editBtn).toBeInTheDocument();
        expect(removeBtn).toBeInTheDocument();
      }

    });
  });
});
