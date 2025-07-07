import { useState } from "react";
import { CabinFormsContext } from "./CabinFormsContext";

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


