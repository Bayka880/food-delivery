import { Button, Form, Modal } from "react-bootstrap";

export default function ForgotPass(props: any) {
  /*********************   FORGOT PASSWORD    *****************
   *   * 4 inputs with label ("И-мэйл", "Нууц үг сэргээх код","Нууц үг","Нууц үг давтах")
   *   * depending on which state you are in show the respected inputs
   *
   *   * Single title and innerText must be one of "Нууц үг сэргээх" or "Нууц үг зохиох"
   *   * depending on which state you are in
   *
   *    * Single button and innerText must be one of "Үргэлжлүүлэх" or "Хадгалах"
   *    * depending on which state you are in
   **************************************************************/

  return (
    <>
      <Modal
        show={props.showForgot}
        onHide={props.handleCloseForgot}
        className="login-modal"
      >
        <Modal.Header closeButton className="border-0 me-3">
          <Modal.Title className="d-flex align-items-center pt-4 ms-5">
            <div className="logframe me-2"></div>
            <h2 className="logintit m-0 p-0">нууц үг сэргээх</h2>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group
              className="mb-3 mx-5"
              controlId="exampleForm.ControlInput1"
            >
              <Form.Label className="frametit">И-мэйл</Form.Label>
              <Form.Control
                className="inputframe ms-1"
                type="email"
                placeholder="И-мэйл хаягаа оруулна уу."
                autoFocus
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer className="d-block ms-5 border-0">
          <div>
            <Button className="loginbut">Үргэлжлүүлэх</Button>
          </div>
        </Modal.Footer>
      </Modal>
    </>
  );
}
