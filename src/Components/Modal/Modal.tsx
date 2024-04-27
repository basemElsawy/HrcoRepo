import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { mainContext } from "../GlobalContext/globalContext";
import { ModalInputs, ModalProps, ModalSelectOptions } from "../Models/Models";
const Modal = (props: ModalProps) => {
  const { setActiveModal, isModalActive }: any = useContext(mainContext);
  const [formData, setFormData] = useState<any>({});

  useEffect(() => {
    // console.log();
    props.inputs.forEach((input) => {
      for (let key of Object.keys(input)) {
        if (key === "name")
          setFormData((prev: any) => ({ ...prev, [input[key]]: "" }));
      }
    });
    console.log(formData);
  }, [isModalActive]);

  const inputChangeHandler = (e: any) => {
    setFormData((prev: any) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
    setTimeout(() => {}, 1000);

    console.log(formData);
  };
  const submitHandler = () => {
    props.SubmitButton(formData);
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
              return input.isSelectInput ? (
                <div className="modal-input-container">
                  <select
                    value={formData[`${input.name}`]}
                    required={input.required}
                    name={input.name}
                    onChange={inputChangeHandler}
                  >
                    <option value="" selected disabled>
                      Choose An Employee
                    </option>
                    {input.selectOptions &&
                      input.selectOptions.map((option: ModalSelectOptions) => (
                        <option key={option.id} value={option.value}>
                          {option.option}
                        </option>
                      ))}
                  </select>
                </div>
              ) : (
                <div className="modal-input-container">
                  <input
                    value={formData[`${input.name}`]}
                    type={input.type}
                    required={input.required}
                    placeholder={input.placeholder}
                    name={input.name}
                    onChange={inputChangeHandler}
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
