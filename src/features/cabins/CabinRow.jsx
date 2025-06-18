import styled from "styled-components";
import PropTypes from "prop-types";
import { formatCurrency } from "../../utils/helpers";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteCabin } from "../../services/apiCabins";
import toast from "react-hot-toast";
import CreateCabinForm from "./CreateCabinForm";
import { useState } from "react";

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
const Button = styled.button`
  padding: 0.8rem 1.6rem;
  font-size: 1.4rem;
  font-weight: 600;
  color: #0d0d33;
  background-color: var(--color-grey-300);
  border: none;
  transition: 0.3s all ease-in-out;
  &:hover {
    background-color: var(--color-grey-400);
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
  const [showForm, setShowForm] = useState(false);
  const queryClient = useQueryClient();

  const { isLoading: isDeleting, mutate } = useMutation({
    mutationFn: (id) => deleteCabin(id),
    onSuccess: () => {
      toast.success("Cabin deleted successfully");
      queryClient.invalidateQueries({
        queryKey: ["cabins"],
      });
    },
    onError: (err) => toast.error(err.message),
  });

  return (
    <>
      <TableRow role="row">
        <Img src={image} alt={name} />
        <Cabin>{name}</Cabin>
        <div>Fits up to {maxCapacity} guests</div>
        <Price>{formatCurrency(regularPrice)}</Price>
        <Discount>{formatCurrency(discount)}</Discount>
        <ButtonsContainer>
          <Button
            onClick={() => setShowForm((prev) => !prev)}
            disabled={isDeleting}
          >
            Edit
          </Button>
          <Button onClick={() => mutate(cabinId)} disabled={isDeleting}>
            Delete
          </Button>
        </ButtonsContainer>
      </TableRow>
      {showForm && <CreateCabinForm cabinToEdit={cabin} />}
    </>
  );
};

CabinRow.propTypes = {
  cabin: PropTypes.shape({
    id: PropTypes.number,
    image: PropTypes.string,
    name: PropTypes.string,
    regularPrice: PropTypes.number,
    discount: PropTypes.number,
    maxCapacity: PropTypes.number,
  }).isRequired,
};

export default CabinRow;
