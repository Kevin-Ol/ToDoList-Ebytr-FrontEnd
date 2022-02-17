import styled from 'styled-components';

const Form = styled.form`
  color: var(--darktext);
  font-size: 1.6rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;

  border: 1px solid black;
  min-width: 70rem;
  min-height: 12rem;
  border-radius: 12px;
  background-color: var(--lightbg);
  box-shadow: 0 0 1.5rem rgba(0, 0, 0, 0.8);

  input {
    margin-left: 1rem;
    padding: 0.5rem;
    font-family: inherit;
    border: none;
    background-color: var(--lightbg);
    border-bottom: 1px solid var(--darktext);
  }

  select {
    margin-left: 1rem;

    padding: 0.5rem;
    font-family: inherit;
    color: inherit;
    background-color: var(--lightbg);
  }

  button {
    background-color: var(--secondary);
    border: none;
    padding: 1rem 2rem;
    border-radius: 12rem;
    color: inherit;

    :hover {
      cursor: pointer;
      box-shadow: inset 0 0 0 3px #fff;
    }
  }
`;

export default Form;
