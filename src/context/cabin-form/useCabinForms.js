import { useContext } from "react";
import { CabinFormsContext } from "./CabinFormsContext";
export function useCabinForms() {
  const context = useContext(CabinFormsContext);
  if (context === undefined) {
    throw new Error("useCabinForms must be used within a CabinFormsProvider");
  }
  return context;
}

