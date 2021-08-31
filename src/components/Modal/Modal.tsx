import ReactDOM from "react-dom";

const modalDivWrapper = document.querySelector("#modal") as HTMLDivElement;

export interface ModalProps {
  isOpen?: boolean;
}

const Modal = ({ isOpen = false }: ModalProps) => {
  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <>
      <div>Modal</div>
    </>,
    modalDivWrapper
  );
};

export default Modal;
