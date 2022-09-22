import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export default function LogOut(props: any) {
  const [ref, setRef] = useState<boolean>(false);
  let navigate = useNavigate();

  return (
    <Modal
      show={props.logOut}
      onHide={props.logOutModalClose}
      className="logout-modal-outer"
    >
      <Modal.Body className="logout-modal">
        <p className="p-4">Та системээс гарахдаа итгэлтэй байна уу?</p>
        <button
          onClick={() => {
            localStorage.removeItem("user");
            setRef(true);
            props.logOutModalClose();
            navigate("/home");
          }}
          className="logout-button p-2"
        >
          Тийм
        </button>
        <button onClick={props.logOutModalClose} className="logout-button p-2">
          Үгүй
        </button>
      </Modal.Body>
    </Modal>
  );
}
