import React, { useState } from "react";
import { Button, Modal, Form, Toast } from "react-bootstrap";
import { toast } from "react-toastify";
import "../../styles/register.css";

export default function Register(props: any) {
  /*********************   Register  ***********************************
   *   * Title Бүртгүүлэх
   *   * 1 input type of email and 2 input type of password 1 input for name
   *     1 text area for the address
   *   * Үйлчилгээний нөхцөл зөвшөөрөх checkbox
   *   * Бүртгүүлэх button suppose to send email and password to the back-end
   *   * unless user has entered 2 password same, all fields are filled and
   *     checkbox is checked Do not send the information with the Бүртгүүлэх button
   **********************************************************************/
  const [typePass, setTypePass] = useState("password");

  function showHandler() {
    if (typePass === "password") {
      setTypePass("text");
    } else {
      setTypePass("password");
    }
  }

  const registerHandler = async (e: any) => {
    e.preventDefault();

    if (e.target[6].checked === true) {
      if (
        e.target.elements.password1.value === e.target.elements.password2.value
      ) {
        const regIn = {
          name: e.target.elements.name.value,
          email: e.target.elements.email.value,
          phone: e.target[3].value,
          address: e.target.elements.address.value,
          password: e.target.elements.password1.value,
        };
        regVal(regIn);
      } else {
        toast("Нууц үг адил байх ёстой!");
      }
    } else {
      toast("Үйлчилгээний нөхцлийг зөвшөөрнө үү.");
    }
  };

  const regVal = async (namePass: any) => {
    return fetch("https://dev-api.mstars.mn/admin/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(namePass),
    })
      .then((res) => res.json())
      .then((res) => {
        props.toast(res.status);
        if (res.success === true) {
          props.handleCloseRegister();
          toast("Hereglech amjilttai burtgeddlee nevterch orno uu");
        }
      });
  };

  const [isChecked, setIsChecked] = useState(false);

  const handleOnChange = () => {
    setIsChecked(!isChecked);
  };

  return (
    <>
      <Modal
        show={props.showRegister}
        onHide={props.handleCloseRegister}
        className="login-modal"
      >
        <Modal.Header closeButton className="border-0 me-3">
          <Modal.Title className="d-flex align-items-center pt-4 ms-5">
            <div className="logframe me-2"></div>
            <h2 className="logintit p-0 m-0">Бүртгүүлэх</h2>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={registerHandler}>
            <Form.Group className="mb-3 mx-5">
              <Form.Label className="nameTit">Нэр</Form.Label>
              <Form.Control
                className="inputframe ms-1"
                type="name"
                placeholder="Нэрээ оруулна уу."
                autoFocus
                name="name"
                required
              />
              <Form.Label className="nameTit">И-мэйл</Form.Label>
              <Form.Control
                className="inputframe ms-1"
                type="email"
                placeholder="И-мэйл хаягаа оруулна уу."
                autoFocus
                name="email"
                required
              />
              <Form.Label className="nameTit">Хаяг</Form.Label>
              <Form.Control
                className="inputframe ms-1"
                type="address"
                placeholder="Хаягаа оруулна уу."
                autoFocus
                name="address"
                required
              />
              <Form.Label className="nameTit">Утасны дугаар</Form.Label>
              <Form.Control
                className="inputframe ms-1"
                type="number"
                placeholder="Утасны дугаараа оруулна уу."
                autoFocus
                name="number"
                required
              />
              <Form.Label className="nameTit">Нууц үг</Form.Label>
              <Form.Group className="position-relative">
                <Form.Control
                  className="inputframe ms-1"
                  type={props.typeName}
                  placeholder="Нууц үгээ оруулна уу. "
                  autoFocus
                  id="passimg"
                  name="password1"
                  required
                />
                <i onClick={props.hideHandler} className=" hide-button">
                  <img src="images/icons/hide.svg" alt="" className="" />
                </i>
              </Form.Group>
              <Form.Label className="nameTit">Нууц үг давтах</Form.Label>
              <Form.Group className="position-relative">
                <Form.Control
                  className="inputframe ms-1"
                  type={typePass}
                  placeholder="Нууц үгээ давтаж оруулна уу. "
                  autoFocus
                  name="password2"
                  required
                />
                <i onClick={showHandler} className=" hide-button">
                  <img src="images/icons/hide.svg" alt="" className="" />
                </i>
              </Form.Group>
              <div>
                <h3 className="termBut">
                  <div>
                    <div className="custom-checkbox">
                      <input
                        type="checkbox"
                        className="aa"
                        id="policy"
                        checked={isChecked}
                        onChange={handleOnChange}
                      />
                      <label htmlFor="policy">
                        Үйлчилгээний нөхцөл зөвшөөрөх
                      </label>
                    </div>
                  </div>
                </h3>
              </div>
            </Form.Group>
            <div className="d-block ms-5 border-0">
              <Button type="submit" className="loginbut">
                бүртгүүлэх
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}
