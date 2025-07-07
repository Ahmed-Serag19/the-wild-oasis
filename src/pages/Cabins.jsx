import Heading from "../ui/Heading";
import Row from "../ui/Row";
import CabinTable from "../features/cabins/CabinTable";
import Button from "../ui/Button";
import CreateCabinForm from "../features/cabins/CreateCabinForm";
import { useCabinForms } from "../context/cabin-form/useCabinForms";
import CabinTableOperations from "../features/cabins/CabinTableOperations";
import styled from "styled-components";

// Breakpoints
const breakpoints = {
  sm: "600px",
};

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 1rem;

  @media (max-width: ${breakpoints.sm}) {
    justify-content: center;
  }
`;

const ResponsiveRow = styled(Row)`
  flex-direction: ${(props) =>
    props.type === "horizontal" ? "row" : "column"};
  align-items: flex-start;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 1rem;

  @media (max-width: ${breakpoints.sm}) {
    flex-direction: column;
    align-items: stretch;
  }
`;

const CabinsContainer = styled.div`
  padding: 1rem;
  min-width: 100rem;

  @media (max-width: ${breakpoints.sm}) {
    padding: 0.5rem;
  }
`;

function Cabins() {
  const { showAddCabin, setShowAddCabin } = useCabinForms();

  return (
    <CabinsContainer>
      <ResponsiveRow type="horizontal">
        <Heading as="h1">All cabins</Heading>
        <CabinTableOperations />
      </ResponsiveRow>

      <ResponsiveRow>
        <CabinTable />
        <ButtonContainer>
          <Button onClick={() => setShowAddCabin((prev) => !prev)}>
            Add new Cabin
          </Button>
        </ButtonContainer>
        {showAddCabin && <CreateCabinForm />}
      </ResponsiveRow>
    </CabinsContainer>
  );
}

export default Cabins;

