import React, { useState } from "react";
import { Button, Modal, Form } from "react-bootstrap";
import "../../styles/login.css";
import Register from "../contents/Register";
import ForgotPass from "../contents/ForgotPass";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useUser } from "../../contexts/UserCtx";

export default function Login(props: any) {
  /*********************   Login Modal    *******************************
   *   * Title Нэвтрэх
   *   * 1 input type of email and 1 input type of password
   *   * Нууц үгээ мартсан? text to redirect to forgotpass url
   *   * Нэвтрэх is the only button with type of submit
   *   * Бүртгүүлэх is radio button that will redirect to register url
   *   * if successfully added to the basket close the modal and open cardSideBar
   *   * if not successfully logged in toaster will appair
   *   * backdrop or x buttons will close the modal!
   **********************************************************************/

  const [showRegister, setShowRegister] = useState<boolean>(false);
  const [showForgot, setShowForgot] = useState(false);
  const [typeName, setTypeName] = useState("password");
  const { user, setUsers } = useUser();

  const handleCloseRegister = () => setShowRegister(false);
  const handleShowRegister = (state: any) => setShowRegister(state);
  // <------------------------------------------------>

  const handleCloseForgot = () => setShowForgot(false);
  const handleShowForgot = (state: any) => setShowForgot(state);
  // <------------------------------------------------>
  function loginHandler(e: any) {
    const loginForm = {
      email: e.target[0].value,
      password: e.target[1].value,
    };
    logIn(loginForm);
    e.preventDefault();
  }
  const logIn = async (namePass: any) => {
    return fetch("https://dev-api.mstars.mn/admin/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(namePass),
    })
      .then((res) => res.json())
      .then((res) => {
        toast(res.status);

        if (res.success === true) {
          let user = {
            email: res.data.email,
            name: res.data.name,
            token: res.token,
            address: res.data.address,
            phone: res.data.phone,
          };
          setUsers(user);

          props.handleCloseLoginModal();
        }
      });
  };

  function hideHandler() {
    if (typeName === "password") {
      setTypeName("text");
    } else {
      setTypeName("password");
    }
  }

  return (
    <>
      <Modal
        show={props.login}
        onHide={props.handleCloseLoginModal}
        className="login-modal"
      >
        <Modal.Header closeButton className="border-0 me-3">
          <Modal.Title className="d-flex align-items-center pt-4 ms-5">
            <div className="logframe me-2"></div>
            <h2 className="logintit p-0 m-0">нэвтрэх</h2>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={loginHandler}>
            <Form.Group className="mx-3" controlId="exampleForm.ControlInput1">
              <Form.Label className="frametit">И-мэйл</Form.Label>
              <Form.Control
                className="inputframe ms-1"
                type="email"
                placeholder="И-мэйл хаягаа оруулна уу."
                autoFocus
              />
              <Form.Label className="frametit">Нууц үг</Form.Label>
              <Form.Group className="position-relative">
                <Form.Control
                  className="inputframe ms-1"
                  type={typeName}
                  placeholder="Нууц үгээ оруулна уу. "
                  autoFocus
                  id="passimg"
                />
                <i onClick={hideHandler} className=" hide-button">
                  <img src="images/icons/hide.svg" alt="" className="" />
                </i>
              </Form.Group>

              <div className="d-flex justify-content-end">
                <Button
                  className="forgotpasstit me-1"
                  onClick={() => {
                    handleShowForgot(true);
                    props.handleCloseLoginModal();
                  }}
                >
                  Нууц үгээ мартсан?
                </Button>
              </div>
              <div className="">
                <Button className="loginBut" type="submit">
                  нэвтрэх
                </Button>
              </div>
              <div>
                <h3 className="orBut">эсвэл</h3>
              </div>
            </Form.Group>
          </Form>
          <div className="register-button">
            <Button
              className="signBut "
              onClick={() => {
                handleShowRegister(true);
                props.handleCloseLoginModal();
              }}
            >
              бүртгүүлэх
            </Button>
          </div>
        </Modal.Body>
      </Modal>
      <Register
        handleCloseRegister={handleCloseRegister}
        showRegister={showRegister}
        toast={toast}
        hideHandler={hideHandler}
        typeName={typeName}
        login={props.login}
      />
      <ForgotPass
        showForgot={showForgot}
        handleCloseForgot={handleCloseForgot}
      />
      <ToastContainer />
    </>
  );
}
