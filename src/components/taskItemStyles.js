import styled, { css } from 'styled-components';

const TaskLi = styled.li`
  background-color: var(--lightbg);
  list-style: none;
  display: grid;
  width: 70rem;
  font-size: 1.6rem;
  padding: 0.7rem 2rem;
  color: var(--darktext);
  margin-bottom: 1rem;
  border-radius: 12px;
  box-shadow: 0 0 1rem rgba(0, 0, 0, 0.5);

  grid-template-columns: 35fr 20fr 25fr 20fr;

  ${(props) => props.header
    && css`
      font-weight: 600;
    `};

    ${(props) => props.status === 'Pendente'
    && css`
      border: 5px solid grey;
    `};

    ${(props) => props.status === 'Pronto'
    && css`
      border: 5px solid green;
    `};

    ${(props) => props.status === 'Em andamento'
    && css`
      border: 5px solid yellow;
    `};
    
  input {
    max-width: 60%;
  }

  span:last-child {
    text-align: center;
  }

  div {
    display: flex;
    justify-content: space-around;

    button {
      :hover {
        cursor: pointer;
      }

      svg {
        font-size: 1.6rem;
      }
    }

    button:nth-child(1) {
      svg {
        stroke: green;
        fill: green;
      }
    }

    button:nth-child(2) {
      svg {
        fill: green;
        stroke: black;
      }
    }


    button:nth-child(3) {
      svg {
        fill: blue;
      }
    }


    button:nth-child(4) {
      svg {
        fill: yellow;
      }
    }

    button:nth-child(5) {
      svg {
        fill: red;
      }
    }

  }
`;

export default TaskLi;
