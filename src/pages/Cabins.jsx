import { useState } from "react";
import Heading from "../ui/Heading";
import Row from "../ui/Row";
import CabinTable from "../features/cabins/CabinTable";
import Button from "../ui/Button";
import CreateCabinForm from "../features/cabins/CreateCabinForm";
function Cabins() {
  const [showForm, setShowForm] = useState(false);
  const handleShowForm = () => {
    setShowForm((prev) => !prev);
  };
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">All cabins</Heading>
      </Row>
      <Row>
        <CabinTable />
        <Button onClick={handleShowForm}>Add new Cabin</Button>
        {showForm && <CreateCabinForm />}
      </Row>
    </>
  );
}

export default Cabins;
