import Heading from "../ui/Heading";
import Row from "../ui/Row";
import CabinTable from "../features/cabins/CabinTable";
import Button from "../ui/Button";
import CreateCabinForm from "../features/cabins/CreateCabinForm";
import { useCabinForms } from "../context/CabinFormsContext";
function Cabins() {
  const { showAddCabin, setShowAddCabin } = useCabinForms();
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">All cabins</Heading>
      </Row>
      <Row>
        <CabinTable />
        <Button onClick={() => setShowAddCabin((prev) => !prev)}>
          Add new Cabin
        </Button>
        {showAddCabin && <CreateCabinForm />}
      </Row>
    </>
  );
}

export default Cabins;
