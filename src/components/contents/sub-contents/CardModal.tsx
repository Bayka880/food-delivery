import React from "react";
import { Button, Modal, Row, Col } from "react-bootstrap";
import { useState } from "react";
import { Food, ModalProps } from "../../../types/food";
import "../../../styles/cardModal.css";
import { useBasket } from "../../../contexts/BasketCtx";
import { toast } from "react-toastify";

export default function CardModal(food: ModalProps) {
  /*********************   SINGLE FOOD Card Modal INFORMATION    *****************
   *   * Detailed information about food
   *   * On click x or backdrop closes the modal
   *   * Depending on user login state, Сагслах or Нэвтрэх button will appair
   *      // Хэрэглэгчийн нэвтрэх төлөвөөс хамааран Сагслах эсвэл Нэвтрэх товчлуур гарч ирнэ
   *   * When clicked on Сагслах:
   *        * if user logged in state then send quantity and food id to back-end
   *          when sucessfully added to the basked close the modal and open sidebar
   *          // login хийсэн бол back-end руу  тоо болон ID илгээх
   *        * if user is not logged in the Login modal suppose to appair
   *          // login хийгээгүй бол харагдана
   *******************************************************************************/

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [count, setCount] = useState<number>(1);
  const { foodBasket, setFoodBasket } = useBasket();

  function handler(e: any) {
    if (e.target.innerHTML === "+" && count < 50) {
      return setCount(count + 1);
    } else if (count > 1) {
      return setCount(count - 1);
    }
    // return setCount(count - 1);
  }

  function handlerNameNum() {
    if (localStorage.getItem("user")) {
      const hoolshalgah = foodBasket.filter((a: Food) => {
        return a._id == food.food._id;
      });

      const nameNum = {
        name: food.food.name,
        category: food.food.category,
        discount: food.food.discount,
        image: food.food.image,
        price: food.food.price,
        sales: food.food.sales,
        ingredients: food.food.ingredients,
        quantity: count,
        _id: food.food._id,
        category_id: food.food.category_id,
        product_id: food.food._id,
      };
      if (hoolshalgah.length > 0) {
        setFoodBasket(
          foodBasket.map((foodQuant: Food) => {
            if (foodQuant._id === food.food._id) {
              return {
                ...foodQuant,
                quantity: foodQuant.quantity
                  ? foodQuant.quantity + count
                  : count,
              };
            } else {
              return foodQuant;
            }
          })
        );
      } else {
        setFoodBasket([...foodBasket, nameNum]);
      }
    } else {
      toast("Та нэвтэрч орно уу ");
    }

    setShow(false);
  }
  return (
    <div>
      <>
        <button onClick={handleShow} className="border-0 btn1">
          <img
            src="images/icons/basket_icon.svg"
            alt=""
            className="basketWidth"
          />
          <p className="text-light line1 m-0">Сагслах</p>
        </button>

        <Modal show={show} onHide={handleClose}>
          <div className="modalPad">
            <Modal.Header
              closeButton
              className="border-0 p-0 closeX"
            ></Modal.Header>
            <Row>
              <Col lg={5}>
                <div className="">
                  <img
                    src={`https://mtars-fooddelivery.s3.ap-southeast-1.amazonaws.com${food.food.image}`}
                    alt=""
                    className="mt-md-3 mt-lg-0 image"
                  />
                </div>
              </Col>
              <Col lg={6} className="d-flex flex-column min-vh-25">
                <div className="d-flex justify-content-between align-items-center py-2 py-lg-0  bor1">
                  <h5 className="textH5 m-0">{food.food.name}</h5>
                  <p className="textP c1 m-0 mb-lg-2">{food.food.price}₮</p>
                </div>

                <h5 className="entranceH5 mt-2">Орц</h5>
                <div className="entranceBack">
                  <p className="entranceP5">{food.food.ingredients}</p>
                </div>

                <h5 className="entranceH5  mt-2">Тоо</h5>
                <div className="d-flex">
                  <Button className="dec" onClick={handler} id="btn">
                    -
                  </Button>
                  <div className="input d-flex j text-center justify-content-center align-items-center">
                    {count}
                  </div>

                  <Button className="dec" onClick={handler} id="btn">
                    +
                  </Button>
                </div>
                <div className="mt-auto">
                  <Button
                    className="mt-3 basketText  btn2 w-100"
                    onClick={handlerNameNum}
                  >
                    Сагслах
                  </Button>
                </div>
              </Col>
            </Row>
          </div>
        </Modal>
      </>
    </div>
  );
}
