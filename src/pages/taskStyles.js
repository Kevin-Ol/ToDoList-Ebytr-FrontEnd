import styled from 'styled-components';

const Main = styled.main`
  min-height: 100vh;
  min-width: 100vw;
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 2rem;
  background-color: var(--mainbg);

  h1 {
    color: #fff;
    font-size: 3.2rem;
    margin-top: 2rem;
  }
`;

export default Main;
