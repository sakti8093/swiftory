import modalcss from "../modal/modal.module.css";
import redcross from "../../assets/svg/redcross.svg";
const Modal = ({ children, handleModalHide }) => {
  return (
    <div className={modalcss.backdrop}>
      <div className={modalcss.modal}>
        <img
          onClick={handleModalHide}
          className={modalcss.cross}
          src={redcross}
        />
        {children}
      </div>
    </div>
  );
};

export default Modal;
