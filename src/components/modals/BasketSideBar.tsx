import React, { useState } from "react";
import { Button, Offcanvas } from "react-bootstrap";
import { useBasket } from "../../contexts/BasketCtx";
import { Food } from "../../types/food";
import "../../styles/busket.css";
import { NavLink } from "react-router-dom";
import { useUser } from "../../contexts/UserCtx";

type CardProps = {
  food: Food;
  setFoodBasket: React.Dispatch<React.SetStateAction<Food[]>>;
  foodBasket: Food[] | any;
  index: number;
};

export const BasketCard = (props: CardProps) => {
  const { food, setFoodBasket, foodBasket, index } = props;
  const [changeCount, setChange] = useState();

  function handler(e: any) {
    let basketFood = food;
    if (e.target.innerHTML == "+" && basketFood.quantity < 50) {
      basketFood.quantity += 1;
    } else if (basketFood.quantity > 1) {
      basketFood.quantity -= 1;
    }

    setFoodBasket([...foodBasket]);
  }
  const removeLocal = (index: number) => {
    if (localStorage.getItem("food") !== "") {
      let storedNames = JSON.parse(localStorage.getItem("food") || "{}");
      let basketdish = storedNames.filter((e: any, i: number) => i !== index);
      localStorage.setItem("food", JSON.stringify(basketdish));
      setFoodBasket([...basketdish]);
    }
  };

  return (
    <div>
      <div className="d-flex wholebusket justify-content-between">
        <div className="busketctx">
          <img
            src={`https://mtars-fooddelivery.s3.ap-southeast-1.amazonaws.com${food.image}`}
            alt="foodpic"
          />
        </div>
        <div>
          <div className="d-flex dishsec justify-content-between">
            <div>
              <div className="dishname">{food.name}</div>
              <div className="dishprice pt-2">{food.price}</div>{" "}
            </div>
          </div>
          <div className="d-flex justify-content-start pt-4">
            <Button className="dec" onClick={(e) => handler(e)} id="btn">
              -
            </Button>
            <div className="input  text-center justify-content-center align-items-center dishcount">
              {food.quantity}
            </div>
            <Button className="dec" onClick={(e) => handler(e)} id="btn">
              +
            </Button>
          </div>
        </div>
        <div className="">
          <button className="basketbutton" onClick={() => removeLocal(index)}>
            X
          </button>
        </div>
      </div>
      <hr id="baskethr" />
    </div>
  );
};

export default function BasketSideBar(props: any) {
  const { user, setUsers } = useUser();

  const { foodBasket, setFoodBasket } = useBasket();
  function sumOfDishes() {
    let total = 0;
    foodBasket.forEach((dish) => (total += dish.price * dish.quantity));
    return total;
  }
  let sum: number = sumOfDishes();

  return (
    <div>
      {localStorage.getItem("user") ? (
        <Offcanvas
          show={props.basketCanvas}
          onHide={props.handleCloseBasket}
          placement={"end"}
        >
          <Offcanvas.Header closeButton>
            <Offcanvas.Title>Таны сагс</Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <div className="d-flex flex-column justify-content-between h-100">
              <div>
                {foodBasket &&
                  foodBasket.map((food: Food, i: number) => {
                    return (
                      <BasketCard
                        key={i}
                        food={food}
                        setFoodBasket={setFoodBasket}
                        foodBasket={foodBasket}
                        index={i}
                      />
                    );
                  })}
              </div>
              <div className="pb-4">
                <div className="sum-of-dishes d-flex justify-content-end pb-2">
                  Нийт: {sum}
                </div>
                <div>
                  <Button id="button-order" data-bs-dismiss="offcanvass">
                    <NavLink
                      to={"/order"}
                      id="changeto-order"
                      onClick={props.handleCloseBasket}
                    >
                      Захиалах
                    </NavLink>
                  </Button>
                </div>
              </div>
            </div>
          </Offcanvas.Body>
        </Offcanvas>
      ) : (
        <Offcanvas
          show={props.basketCanvas}
          onHide={props.handleCloseBasket}
          placement={"end"}
        >
          <Offcanvas.Header closeButton>
            <Offcanvas.Title>Таны сагс</Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <div className="d-flex flex-column justify-content-between h-100">
              <h4 className="m-auto">Нэвтэрч орно уу</h4>
            </div>
          </Offcanvas.Body>
        </Offcanvas>
      )}
    </div>
  );
}
