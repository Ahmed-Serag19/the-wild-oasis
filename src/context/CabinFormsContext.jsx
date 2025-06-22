import { createContext, useContext, useState } from "react";
import PropTypes from "prop-types";

// ✅ Create context
const CabinFormsContext = createContext(undefined);

// ✅ Provider component
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

// ✅ Add prop-types validation
CabinFormsProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

// ✅ Hook to use the context
export function useCabinForms() {
  const context = useContext(CabinFormsContext);
  if (context === undefined) {
    throw new Error("useCabinForms must be used within a CabinFormsProvider");
  }
  return context;
}
