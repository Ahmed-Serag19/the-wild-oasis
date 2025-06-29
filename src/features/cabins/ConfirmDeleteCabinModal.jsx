import styled from "styled-components";
import PropTypes from "prop-types";

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.6);
  display: grid;
  place-items: center;
  z-index: 1000;
`;

const Modal = styled.div`
  background-color: var(--color-grey-0);
  padding: 3.2rem 4.8rem;
  border-radius: 8px;
  max-width: 40rem;
  width: 100%;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.25);
  text-align: center;
`;

const Message = styled.p`
  font-size: 1.6rem;
  margin-bottom: 2.4rem;
  color: var(--color-grey-700);
`;

const Buttons = styled.div`
  display: flex;
  justify-content: center;
  gap: 1.6rem;
`;

const Button = styled.button`
  padding: 0.8rem 2.4rem;
  font-size: 1.4rem;
  font-weight: 600;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.2s ease-in-out;
  &:disabled {
    cursor: not-allowed;
  }
  ${({ variation }) =>
    variation === "danger"
      ? `
    background-color: var(--color-red-600);
    color: white;
    &:hover {
      background-color: var(--color-red-700);
    }
  `
      : `
    background-color: var(--color-grey-300);
    color: #333;
    &:hover {
      background-color: var(--color-grey-400);
    }
  `}
`;

const ConfirmDeleteCabinModal = ({ confirmDelete, onClose }) => {
  return (
    <Overlay>
      <Modal>
        <Message>Are you sure you want to delete this cabin?</Message>
        <Buttons>
          <Button onClick={onClose}>Cancel</Button>
          <Button variation="danger" onClick={confirmDelete}>
            Delete
          </Button>
        </Buttons>
      </Modal>
    </Overlay>
  );
};

ConfirmDeleteCabinModal.propTypes = {
  confirmDelete: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default ConfirmDeleteCabinModal;
