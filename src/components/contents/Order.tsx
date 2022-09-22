import React, { useEffect, useState } from "react";
import "../../styles/order.css";
import { useBasket } from "../../contexts/BasketCtx";
import { Food } from "../../types/food";
import { useUser } from "../../contexts/UserCtx";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function Order() {
  const { foodBasket, setFoodBasket } = useBasket();
  const { user, setUsers } = useUser();
  const [street, setStreet] = useState([]);
  const [district, setDistrict] = useState([]);
  const [apart, setApart] = useState([]);
  const [select, setSelected] = useState<boolean[]>([false, false, false]);

  let navigate = useNavigate();
  useEffect(() => {
    fetch("./Address.json")
      .then((res) => res.json())
      .then(
        (data) => (
          setStreet(data.street),
          setDistrict(data.district),
          setApart(data.apartment)
        )
      );
  }, []);
  const style = {
    firstSelet: {
      backgroundColor: select[0] ? "#F17228" : "white",
      color: select[0] ? "#FFFFFF" : "#BDBDBD",
    },
    secSelect: {
      backgroundColor: select[1] ? "#F17228" : "white",
      color: select[1] ? "#FFFFFF" : "#BDBDBD",
    },
    thirdSelect: {
      backgroundColor: select[2] ? "#F17228" : "white",
      color: select[2] ? "#FFFFFF" : "#BDBDBD",
    },
  };
  /* ----sum price---- */
  function sumPriceFood() {
    let sumPrice: number = 0;
    foodBasket.forEach((price) => (sumPrice += price.price * price.quantity));
    return sumPrice;
  }
  let sumFood: number = sumPriceFood();

  /*---- food remove---- */
  function removefood(id: string) {
    setFoodBasket(foodBasket.filter((item) => item._id !== id));
    localStorage.setItem("food", JSON.stringify(foodBasket));
  }

  /*-----Order button---- */
  let paymentMethod: string = "";
  function handlerPay(e: any) {
    if (e.target[5].checked == true) {
      paymentMethod = "CASH";
    } else if (e.target[6].checked == true) {
      paymentMethod = "CARD";
    }
  }
  const orderVal = async (order: any) => {
    return fetch("https://dev-api.mstars.mn/api/order", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(order),
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.success === true) {
          toast("Амжилттай захиалга хийгдлээ");
          navigate("/home");
        } else {
          toast("Та дахин нэвтэрч захиалгаа хийнэ үү!! ");
        }
      });
  };
  const hand = (e: any) => {
    e.preventDefault();
    handlerPay(e);
    const userAddress = {
      district: e.target[0].value,
      khoroo: e.target[1].value,
      apartment: e.target[2].value,
      additional: e.target[3].value,
    };
    const order = {
      user_id: user && user.address.user_id,
      user_address: userAddress,
      phone: e.target[4].value,
      basket: foodBasket,
      payment_type: paymentMethod,
      token: user && user.token,
    };
    orderVal(order);
  };
  return (
    <div className="container mb-4 order-section-contents">
      <form action="order" className="container " onSubmit={hand}>
        <div className="row mt-4">
          <div className="col-lg-6 col-sm-12">
            <div className="userorder">
              <div>
                <span className="step">
                  <span>Алхам 1 &gt;</span>{" "}
                  <span>Хаягийн мэдээлэл оруулах</span>
                </span>
              </div>
              <div className="mt-4 verify">
                <div className="ps-4 order-place">
                  Хаягийн мэдээлэл оруулна уу.
                </div>
                <div>
                  <select
                    style={style.firstSelet}
                    className="form-control mt-3 bg"
                    onChange={() =>
                      setSelected([(select[0] = true), select[1], select[2]])
                    }
                  >
                    <option>Дүүрэг сонгоно уу.</option>
                    {district &&
                      district.map((dist: string, i: number) => {
                        return (
                          <option key={i} value={dist}>
                            {dist}
                          </option>
                        );
                      })}
                  </select>
                  <select
                    style={style.secSelect}
                    className="form-control mt-3 bg"
                    onChange={() =>
                      setSelected([
                        (select[0] = true),
                        (select[1] = true),
                        select[2],
                      ])
                    }
                  >
                    <option id="bair">Байр, гудамж сонгоно уу.</option>
                    {apart &&
                      apart.map((apartment: string, i: number) => {
                        return (
                          <option key={i} value={apartment}>
                            {apartment}
                          </option>
                        );
                      })}
                  </select>
                  <select
                    className="form-control mt-3 bg"
                    id="street"
                    onChange={() =>
                      setSelected([
                        (select[0] = true),
                        select[1],
                        (select[2] = true),
                      ])
                    }
                    style={style.thirdSelect}
                  >
                    <option>Хороо сонгоно уу.</option>
                    {street &&
                      street.map((apart: string, i: number) => {
                        return (
                          <option key={i} value={apart}>
                            {apart}
                          </option>
                        );
                      })}
                  </select>
                </div>
                <div className="address-description d-flex flex-column mt-3">
                  <label htmlFor="location" className="location-more">
                    Хаягийн дэлгэрэнгүй
                  </label>
                  <input
                    type="text"
                    className="more-address"
                    placeholder="Орц,давхар,орцны код... "
                  />
                </div>
                <div className="address-description  d-flex flex-column mt-3">
                  <label htmlFor="phone" className="phone-number">
                    Утасны дугаар*
                  </label>
                  <input
                    type="text"
                    className="phone-number-field"
                    placeholder="Утасны дугаараа оруулна уу. "
                    required
                  />
                </div>
                <div className="payment mt-3">Төлбөр төлөх сонголт</div>
                <div className="d-flex payment-section justify-conten-between">
                  <div className="custom-control custom-radio">
                    <input
                      type="radio"
                      id="customRadio1"
                      name="customRadio"
                      className="custom-control-input"
                    />
                    <label
                      className="custom-control-label CashOrCard "
                      htmlFor="customRadio1"
                    >
                      Бэлнээр
                    </label>
                  </div>
                  <div className="custom-control custom-radio ps-4">
                    <input
                      type="radio"
                      id="customRadio2"
                      name="customRadio"
                      className="custom-control-input"
                    />
                    <label
                      className="custom-control-label CashOrCard "
                      htmlFor="customRadio2"
                    >
                      Картаар
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-6 col-sm-12">
            <div className="sent-order">
              <div>
                <span className="step">
                  <span>Алхам 2 &gt;</span> <span>Захиалга баталгаажуулах</span>
                </span>
              </div>
              <div className="verify mt-4 d-flex  flex-column">
                {foodBasket.map((food: Food, index: number) => {
                  return (
                    <div key={index}>
                      <div className="d-flex justify-content-between align-items-center borderBot">
                        <p className="my-3 food-name">
                          {food.name}({food.quantity})
                        </p>
                        <div className="d-flex justify-content-between align-items-center">
                          <p className="m-0 food-price">{food.price}₮</p>
                          <div className="ms-4">
                            <button
                              id="close-button"
                              onClick={() => removefood(food._id)}
                            >
                              <img src="images/icons/cancel.svg" alt="" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
                <div className="mt-auto mx-auto">
                  <p className="total-price mt-2">
                    Нийт: <span className="ps-4">{sumFood}₮</span>
                  </p>
                  <button id="order-button" type="submit">
                    Захиалах
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
