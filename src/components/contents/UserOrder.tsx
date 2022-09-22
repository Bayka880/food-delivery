import React, { useEffect, useState } from "react";
import { UserOrdeType, UserOrdeDetailType } from "../../types/food";
import "../../styles/userOrder.css";
import moment from "moment";
import { useUser } from "../../contexts/UserCtx";

export default function UserOrder() {
  /********************* User Order Component *******************************
   *
   *
   ******************************************************************************/

  const [userOrder, setUserOrder] = useState<UserOrdeType[]>([]);
  const [userDetail, setUserDetail] = useState<UserOrdeDetailType[]>([]);
  const [date, setDate] = useState<string>();
  const { user, setUsers } = useUser();

  useEffect(() => {
    if (user) {
      fetch(
        `https://dev-api.mstars.mn/api/order/user/${user?.address.user_id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ token: user?.token }),
        }
      )
        .then((res) => res.json())
        .then((res) => {
          setUserOrder(res);
          if (res && res[0].order) {
            setUserDetail(res[0].order.orderDetails);
            setDate(moment(res[0].order.created_date).format("YYYYMMDD"));
          }
        });
    }
  }, [user]);

  function handler(orderDetail: any, date: string) {
    let createDate = moment(date).format("YYYYMMDD");
    setDate(createDate);
    const ddd = orderDetail.map((detail: UserOrdeDetailType) => {
      return detail;
    });
    setUserDetail(ddd);
  }

  return (
    <div className="container">
      <div className="tablet-desktop">
        <div className="row mt-4">
          <div className="col-12 col-md-5 col-lg-6">
            <div className="content">
              <div className="verify1 border2">
                <p className="font3 border3">Захиалгын түүх</p>
                {userOrder.map((data2, i) => {
                  return (
                    <div key={i}>
                      <div className="d-flex justify-content-center mt-3 align-items-center justify-content-between ">
                        <div className="d-flex ">
                          <button
                            className="btnOrder"
                            onClick={() =>
                              handler(
                                data2.order.orderDetails,
                                data2.order.created_date
                              )
                            }
                          >
                            <img
                              src="images/icons/good_icon.svg"
                              alt=""
                              className="image-good"
                            />
                          </button>
                          <div>
                            <p className="font m-0 d-flex">
                              <span className="textOrder">Захиалга </span>#
                              <span>
                                {moment(data2.order.created_date).format(
                                  "YYYYMMDD"
                                )}
                              </span>
                            </p>
                            <p className="font2 m-0">
                              {data2.order.status === "waiting"
                                ? "Хүлээгдэж буй"
                                : " Амжилттай"}
                            </p>
                          </div>
                        </div>
                        <p className="font1 m-0">
                          {moment(data2.order.created_date).format(
                            "YYYY/MM/DD"
                          )}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
          <div className="col-12 col-md-7 col-lg-6">
            <div className="content">
              <div className="verify1">
                <div className="d-flex justify-content-center align-items-center justify-content-between border3">
                  <p className="font3 m-0">Дэлгэрэнгүй</p>
                  <p className="font4 m-0">#{date}</p>
                </div>
                {userDetail &&
                  userDetail.map((data2, i) => {
                    return (
                      <div
                        className="d-flex mt-3 justify-content-center align-items-center justify-content-between"
                        key={i}
                      >
                        <p className="font5 m-0">{data2.food_name}</p>
                        <p className="font6 m-0">({data2.qty})</p>
                      </div>
                    );
                  })}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="phone">
        <div>
          <div className="d-flex align-items-center">
            <div className="box"></div>
            <h5 className="text-start font7 m-0">МИНИЙ ЗАХИАЛГА</h5>
          </div>
          <div className="row mt-3">
            <div className="col-6">
              <button className="order-btn w-100">Захиалга</button>
            </div>
            <div className="col-6 ">
              <button className="history-btn w-100">Түүх</button>
            </div>
          </div>

          {userOrder.map((data1: UserOrdeType, i: number) => {
            return (
              <div key={i}>
                <div className="content-phone" key={i}>
                  <div className="d-flex justify-content-between">
                    <p className="font8">
                      <span>
                        {moment(data1.order.created_date).format("YYYY/MM/DD")}
                      </span>
                      <span className="c2">
                        {moment(data1.order.created_date).format("HH:mm")}
                      </span>
                    </p>

                    <p className="c1 font8 bold">
                      {data1.order.status === "waiting"
                        ? "Хүлээгдэж буй"
                        : " Амжилттай"}
                    </p>
                  </div>

                  {data1.order.orderDetails.map((a, i) => (
                    <div className="d-flex justify-content-between" key={i}>
                      <p className="font8">
                        {a.food_name}
                        <span className="c1">({a.qty})</span>
                      </p>
                      <p className="c1 bold">{a.price}₮</p>
                    </div>
                  ))}
                  <div className="d-flex justify-content-between border4">
                    <p className="c1 mt-2 bold">НИЙТ:</p>
                    <p className="mt-2 bold">
                      {data1.order.total_price ? data1.order.total_price : " "}₮
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
