import styled from "styled-components";
const H1 = styled.h1`
  font-size: 30px;
  font-weight: 600;
  background-color: yellow;
`;

const Button = styled.button`
  font-size: 1.4rem;
  font-weight: 500;
  padding: 1.2rem 1.6rem;
  border-radius: 1rem;
  background-color: purple;
  border: none;
  color: white;
`;
const App = () => {
  return (
    <div>
      <H1> The Wild Oasis</H1>
      <Button>Click Me</Button>
    </div>
  );
};

export default App;
