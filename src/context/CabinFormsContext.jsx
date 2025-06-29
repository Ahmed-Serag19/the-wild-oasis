import { createContext, useState } from "react";
import PropTypes from "prop-types";

export const CabinFormsContext = createContext(undefined);

export function CabinFormsProvider({ children }) {
  const [cabinToEdit, setCabinToEdit] = useState(null);
  const [showAddCabin, setShowAddCabin] = useState(false);

  return (
    <CabinFormsContext.Provider
      value={{ cabinToEdit, setCabinToEdit, showAddCabin, setShowAddCabin }}
    >
      {children}
    </CabinFormsContext.Provider>
  );
}

CabinFormsProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
