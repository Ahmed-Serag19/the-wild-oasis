import Spinner from "../../ui/Spinner";
import CabinRow from "./CabinRow";
import useGetCabins from "./useGetCabins";
import { useSearchParams } from "react-router-dom";
import Table from "../../ui/Table";
import Empty from "../../ui/Empty";

const CabinTable = () => {
  const {
    isLoading,
    cabins,
    // error,
  } = useGetCabins();
  const [searchParams] = useSearchParams();

  if (!cabins?.length) return <Empty resource="cabins" />;
  if (isLoading) {
    return <Spinner />;
  }
  // 1) Filter
  const filterValue = searchParams.get("discount") || "all";

  let filteredCabins;
  if (filterValue === "all") filteredCabins = cabins;
  if (filterValue === "no-discount")
    filteredCabins = cabins.filter((cabin) => cabin.discount === 0);
  if (filterValue === "with-discount")
    filteredCabins = cabins.filter((cabin) => cabin.discount > 0);

  // 2) Sort
  const sortBy = searchParams.get("sortBy") || "startDate-asc";
  const [field, direction] = sortBy.split("-");
  const modifier = direction === "asc" ? 1 : -1;
  const sortedCabins = filteredCabins.sort(
    (a, b) => (a[field] - b[field]) * modifier
  );
  return (
    <Table columns="0.6fr 1.8fr 2.2fr 1fr 1fr 1fr" role="table">
      <Table.Header>
        <div></div>
        <div>Cabin</div>
        <div>Capacity</div>
        <div>Price</div>
        <div>Discount</div>
        <div></div>
      </Table.Header>
      <Table.Body
        data={sortedCabins}
        render={(cabin) => <CabinRow cabin={cabin} key={cabin.id} />}
      />
      {/* {filteredCabins.map((cabin) => (
        <CabinRow key={cabin.id} cabin={cabin} />
      ))} */}
    </Table>
  );
};

export default CabinTable;
