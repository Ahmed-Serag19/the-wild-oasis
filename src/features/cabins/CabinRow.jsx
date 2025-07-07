import styled from "styled-components";
import { formatCurrency } from "../../utils/helpers";
import CreateCabinForm from "./CreateCabinForm";
import { useCabinForms } from "../../context/cabin-form//useCabinForms";
import useDeleteCabin from "./useDeleteCabin";
import { useState } from "react";
import ConfirmDeleteCabinModal from "./ConfirmDeleteCabinModal";
import {
  BsFillPencilFill,
  BsFillTrashFill,
  BsFillLayersFill,
} from "react-icons/bs";
import useCreateCabin from "./useCreateCabin";

const TableRow = styled.div`
  display: grid;
  grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
  column-gap: 2.4rem;
  align-items: center;
  padding: 1.4rem 2.4rem;

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }
`;

const Img = styled.img`
  display: block;
  width: 6.4rem;
  aspect-ratio: 3 / 2;
  object-fit: cover;
  object-position: center;
  transform: scale(1.5) translateX(-7px);
`;

const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
`;

const Price = styled.div`
  font-family: "Sono";
  font-weight: 600;
`;

const Discount = styled.div`
  font-family: "Sono";
  font-weight: 500;
  color: var(--color-green-700);
`;
const ButtonsContainer = styled.div`
  display: flex;
  gap: 1rem;
`;

const TooltipWrapper = styled.div`
  position: relative;
  display: inline-block;

  &::after {
    content: attr(data-tooltip);
    position: absolute;
    bottom: 125%;
    left: 50%;
    transform: translateX(-50%);
    background-color: #1d1d34;
    color: #fff;
    padding: 4px 8px;
    border-radius: 4px;
    font-size: 1.4rem;
    white-space: nowrap;
    opacity: 0;
    transition: opacity 0.3s ease-in-out;
    pointer-events: none;
    z-index: 10;
  }

  &:hover::after {
    opacity: 1;
  }
`;

const Button = styled.button`
  padding: 0.8rem 0.8rem;
  font-size: 1.4rem;
  font-weight: 600;
  font-size: 18px;
  border: none;
  transition: 0.3s all ease-in-out;
  border-radius: 5px;
  cursor: pointer;
  &:disabled {
    cursor: not-allowed;
  }

  color: ${({ variation }) => (variation !== "" ? "#ffffff" : "#0d0d33")};

  background-color: ${({ variation }) =>
    variation === "delete"
      ? "var(--color-red-500)"
      : variation === "edit"
      ? "var(--color-blue-600)"
      : variation === "duplicate"
      ? "green"
      : "var(--color-grey-300)"};

  &:hover {
    background-color: ${({ variation }) =>
      variation === "delete"
        ? "var(--color-red-700)"
        : variation === "edit"
        ? "var(--color-blue-700)"
        : variation === "duplicate"
        ? "green"
        : "var(--color-grey-400)"};
    color: #ffffff;
  }

  &:focus {
    outline: 1px solid var(--color-grey-500);
  }
`;
const CabinRow = ({ cabin }) => {
  const {
    name,
    image,
    maxCapacity,
    regularPrice,
    discount,
    id: cabinId,
  } = cabin;
  const { setCabinToEdit, cabinToEdit } = useCabinForms();
  const { isDeleting, deleteCabinFn } = useDeleteCabin();
  const [showModal, setShowModal] = useState(false);
  const { createCabin, isCreating } = useCreateCabin();

  const duplicateCabin = () => {
    createCabin({
      name: `Duplicate ${name}`,
      image,
      maxCapacity,
      regularPrice,
      discount,
    });
  };
  return (
    <>
      <TableRow role="row">
        <Img src={image} alt={name} />
        <Cabin>{name}</Cabin>
        <div>Fits up to {maxCapacity} guests</div>
        <Price>{formatCurrency(regularPrice)}</Price>

        {discount === (null || 0) ? (
          <span>--</span>
        ) : (
          <Discount>{formatCurrency(discount)}</Discount>
        )}

        <ButtonsContainer>
          <TooltipWrapper data-tooltip="Duplicate cabin">
            <Button
              onClick={duplicateCabin}
              disabled={isDeleting || isCreating}
              variation="duplicate"
            >
              <BsFillLayersFill />
            </Button>
          </TooltipWrapper>
          <TooltipWrapper data-tooltip="Edit cabin">
            <Button
              onClick={() =>
                setCabinToEdit((prev) => (prev?.id === cabinId ? null : cabin))
              }
              disabled={isDeleting || isCreating}
              variation="edit"
            >
              <BsFillPencilFill />
            </Button>
          </TooltipWrapper>
          <TooltipWrapper data-tooltip="Delete cabin">
            <Button
              variation="delete"
              onClick={() => setShowModal((prev) => !prev)}
              disabled={isDeleting || isCreating}
            >
              <BsFillTrashFill />
            </Button>
          </TooltipWrapper>
        </ButtonsContainer>
      </TableRow>
      {cabinToEdit?.id === cabinId && <CreateCabinForm />}
      {showModal && (
        <ConfirmDeleteCabinModal
          confirmDelete={() => deleteCabinFn(cabinId)}
          onClose={() => setShowModal((prev) => !prev)}
        />
      )}
    </>
  );
};

export default CabinRow;
