import { useSearchParams } from "react-router-dom";
import Select from "./Select";
const SortBy = ({ options }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const sortBy = searchParams.get("sortBy") || options[0].value;
  const handleChange = (e) => {
    searchParams.set("sortBy", e.target.value);
    setSearchParams(searchParams);
  };
  return (
    <Select
      onChange={handleChange}
      options={options}
      type="white"
      value={sortBy}
    />
  );
};

export default SortBy;
