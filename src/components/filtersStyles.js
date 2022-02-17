import styled from 'styled-components';

const SortDiv = styled.div`
  background-color: var(--lightbg);
  padding: 1.4rem 6rem;
  border-radius: 500px;
  box-shadow: 0 0 1.5rem rgba(0, 0, 0, 0.8);

  h2 {
    font-size: 1.8rem;
    text-align: center;
    margin-bottom: 1rem;
  }

  div {
    display: flex;
    gap: 2rem;

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
  }
`;

export default SortDiv;
