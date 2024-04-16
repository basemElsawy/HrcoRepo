import React from "react";
import { useContext } from "react";
import { mainContext } from "../GlobalContext/globalContext";
import { ModalInputs, ModalProps } from "../Models/Models";
const Modal = (props: ModalProps) => {
  const { setActiveModal, isModalActive }: any = useContext(mainContext);

  const submitHandler = () => {
    props.SubmitButton();
    props.CloseModal();
    setActiveModal(false);
  };

  const closeHandler = () => props.CloseModal();
  return (
    <>
      <div
        onClick={() => {
          setActiveModal(false);
        }}
        className={isModalActive ? "overlay overlay-active" : "overlay "}
      ></div>
      <div
        className={
          isModalActive ? "modal-container modal-active" : "modal-container"
        }
      >
        <div className="modal-header">
          <div className="header-wrapper">
            <h2>{props.headerText}</h2>
            <div onClick={closeHandler}>
              <i className="fa-solid fa-close"></i>
            </div>
          </div>
        </div>
        <div className="modal-body">
          <form action="">
            {props.inputs.map((input: ModalInputs) => {
              return (
                <div className="modal-input-container">
                  <input
                    type={input.type}
                    required={input.required}
                    placeholder={input.placeholder}
                    name={input.name}
                  />
                </div>
              );
            })}
          </form>
        </div>
        <div className="modal-footer">
          <button onClick={submitHandler}>{props.submitButtonText}</button>
        </div>
      </div>
    </>
  );
};

export default Modal;
