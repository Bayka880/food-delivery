import React, { useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Main from "./contents/Main";
import Register from "./contents/Register";
import ForgotPass from "./contents/ForgotPass";
import Search from "./contents/Search";
import Menu from "./contents/Menu";
import Header from "./Header";
import DeliveryZone from "./contents/DeliveryZone";
import UserOrder from "../components/contents/UserOrder";
import Footer from "./Footer";
import Profile from "./contents/Profile";
import Policy from "./contents/sub-contents/Policy";
import Terms from "./contents/sub-contents/Terms";
import Order from "./contents/Order";
export default function Content() {
  /**
   * Some of the route hasnt bet implemented!
   * if the path is not found then redirect to the Error component
   */
  const [changeUserDetails, setChangeUserDetails] = useState();

  return (
    <div className="content">
      <Header changeUserDetails={changeUserDetails} />
      <Routes>
        <Route path="/" element={<Navigate replace to="/home" />} />
        <Route path="/home" element={<Main />} />
        <Route path="/menu" element={<Menu />}>
          <Route path=":name" element={<Menu />} />
        </Route>
        <Route path="/register" element={<Register />} />
        <Route path="/user-order" element={<UserOrder />}></Route>
        <Route path="/order" element={<Order />}></Route>
        <Route path="/search" element={<Search />} />
        <Route
          path="/profile"
          element={
            <Profile
              setChangeUserDetails={setChangeUserDetails}
              changeUserDetails={changeUserDetails}
            />
          }
        />
        <Route path="/delivery" element={<DeliveryZone />}></Route>
        <Route path="/policy" element={<Policy />}></Route>
        <Route path="/terms" element={<Terms />}></Route>
      </Routes>
      <Footer />
    </div>
  );
}
