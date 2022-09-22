import React, { useEffect, useState } from "react";
import "../styles/header.css";
import "../styles/container.css";
import BasketSideBar from "./modals/BasketSideBar";
import { Link, NavLink, useNavigate } from "react-router-dom";
import SearchModal from "./modals/SearchModal";
import MoreMenuCanvas from "./modals/MoreMenuCanvas";
import { useSearch } from "../contexts/SearchCtx";
import Login from "./modals/Login";
import { Dropdown } from "react-bootstrap";
import LogOut from "./modals/LogOut";
import { useUser } from "../contexts/UserCtx";
import { Food } from "../types/food";
import { useBasket } from "../contexts/BasketCtx";
export default function Header(props: any) {
  /*********************   Header Component    *******************************
   *   * As the design shows*
   *   * 3 menu which will redirect to related field
   *   * SearchBox: when user hits the enter redirect to Search component with
   *     the text to search
   *   * Сагс and the icon is button that opens BasketSideBar
   *   * Нэвтрэх/User button's name is changing depending on user logged state
   *       * if user is not logged in button will respond to open login modal
   *       * if user logged in state then name is user name and respond to open
   *         up dropdown menu that has 3 options
   *         * Хэрэглэгчийн мэдээлэл option will redirect to Profile component
   *         * Миний захиалгууд option will redirect to OrderHistory component
   *         * Гарах option will clear all localstorage information and make
   *           user context data into null so that user state will no longer
   *           logged-in state
   **********************************************************************/

  const [searchModal, setSearchModal] = useState<boolean>(false);
  const [basketCanvas, setbasketCanvas] = useState<boolean>(false);
  const [moreMenu, setMoreMenu] = useState<boolean>(false);
  const [login, setLogin] = useState<boolean>(false);
  const { searchTerm, setSearchTerm } = useSearch();
  const [logOut, setLogOut] = useState<boolean>(false);
  const { user, setUsers } = useUser();
  const [basketCount, setBasketCount] = useState<number>();
  const { foodBasket, setFoodBasket } = useBasket();

  /*<---------------- LogOut Modal---------------> */
  const logOutModalClose = () => setLogOut(false);
  const logOutModalShow = () => setLogOut(true);

  /*<---------------- Search Modal---------------> */
  const handleCloseSearch = () => setSearchModal(false);
  const handleShowSearch = () => setSearchModal(true);

  /*<---------------- Basket Canvas---------------> */
  const handleCloseBasket = () => setbasketCanvas(false);
  const handleShowBasket = () => setbasketCanvas(true);

  /*<---------------- LogIn Modal---------------> */
  const handleCloseLoginModal = () => setLogin(false);
  const handleShowLoginModal = () => setLogin(true);

  /*<---------------- More Menu Canvas---------------> */
  const handleCloseMoreMenu = () => setMoreMenu(false);
  const handleShowMoreMenu = () => setMoreMenu(true);

  const activeClass = {};
  const inActiveClass = {};
  let navigate = useNavigate();

  function searchSubmit(e: any) {
    setSearchTerm(e.target[0].value);
    e.preventDefault();
    navigate("/search");
  }

  let quantityOfFoods = foodBasket.map((e) => {
    return e.quantity;
  });
  let sum = quantityOfFoods.reduce((a, b) => {
    return a + b;
  }, 0);

  useEffect(() => {
    setBasketCount(sum);
  }, [sum]);

  return (
    <div className="container header">
      <div
        className="menu-toggle"
        id="mobile-menu"
        onClick={handleShowMoreMenu}
      >
        <div className="bar"></div>
        <div className="bar"></div>
        <div className="bar"></div>
      </div>
      <MoreMenuCanvas
        moreMenu={moreMenu}
        handleCloseMoreMenu={handleCloseMoreMenu}
      />

      <Link
        className="text-decoration-none m-0 p-2 d-flex align-items-center logo-box"
        to="/home"
      >
        <img src="images/icons/logo.svg" alt="logo" id="logo" />
        <p className="text-decoration-none m-0 ps-2 logo-text">Food Delivery</p>
      </Link>

      <div className="menu">
        <NavLink
          to="/home"
          className="text-decoration-none menu-text mx-2"
          style={(isActive) => (isActive ? activeClass : inActiveClass)}
        >
          НҮҮР
        </NavLink>
        <NavLink
          to="/menu"
          style={(isActive) => (isActive ? activeClass : inActiveClass)}
          className="text-decoration-none  menu-text mx-2"
        >
          ХООЛНЫ ЦЭС
        </NavLink>
        <NavLink
          to="/delivery"
          className="text-decoration-none  menu-text mx-2"
          style={(isActive) => (isActive ? activeClass : inActiveClass)}
        >
          ХҮРГЭЛТИЙН БҮС
        </NavLink>
      </div>
      <SearchModal
        handleCloseSearch={handleCloseSearch}
        searchModal={searchModal}
        navigate={navigate}
      />
      <BasketSideBar
        handleCloseBasket={handleCloseBasket}
        basketCanvas={basketCanvas}
      />

      <div className="d-flex justify-content-between align-items-center">
        <form action="search" onSubmit={searchSubmit}>
          <input
            type="text"
            name="search"
            placeholder="Хайх"
            className="search"
          />
          <label htmlFor="search"></label>
        </form>

        <div className="d-flex justify-content-between align-items-center">
          <button
            type="button"
            className="basket-and-login"
            onClick={handleShowSearch}
          >
            <img src="images/icons/search.svg" alt="search" />
          </button>
          <div className="d-flex">
            <button
              className="web-button"
              type="button"
              onClick={handleShowBasket}
            >
              <img
                src="images/icons/busket.svg"
                alt="basket"
                className="me-1 "
              />
              Сагс
              {sum > 0 && localStorage.getItem("user") ? (
                <span className="count-order">{basketCount}</span>
              ) : null}
            </button>
            <button
              className="basket-and-login basket-icon"
              type="button"
              onClick={handleShowBasket}
            >
              <img src="images/icons/busket.svg" alt="" className="" />
              {sum > 0 && localStorage.getItem("user") ? (
                <span className="count-basket">{basketCount}</span>
              ) : null}
            </button>
            {localStorage.getItem("user") ? (
              <Dropdown>
                <Dropdown.Toggle className="web-button" id="dropdown-basic">
                  <img src="images/icons/user.svg" alt="" className="me-1" />
                  {props.changeUserDetails !== undefined
                    ? props.changeUserDetails.name
                    : user?.name}
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item href="/profile" className="drop-down-items">
                    Хэрэглэгчийн мэдээлэл
                  </Dropdown.Item>
                  <Dropdown.Item href="/user-order" className="drop-down-items">
                    Миний захиалгууд
                  </Dropdown.Item>
                  <Dropdown.Item
                    onClick={logOutModalShow}
                    className="drop-down-items"
                  >
                    Гарах
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            ) : (
              <button className="web-button" onClick={handleShowLoginModal}>
                <img src="images/icons/user.svg" alt="" className="me-1" />
                Нэвтрэх
              </button>
            )}
            {localStorage.getItem("user") ? (
              <Dropdown>
                <Dropdown.Toggle
                  className="basket-and-login"
                  id="dropdown-basic"
                >
                  <img src="images/icons/user.svg" alt="" className="me-1" />
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <Dropdown.Item href="/user-order" className="drop-down-items">
                    Миний захиалгууд
                  </Dropdown.Item>
                  <Dropdown.Item href="/profile" className="drop-down-items">
                    Хэрэглэгчийн мэдээлэл
                  </Dropdown.Item>
                  <Dropdown.Item
                    onClick={logOutModalShow}
                    className="drop-down-items"
                  >
                    Гарах
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            ) : (
              <button
                className=" basket-and-login"
                onClick={handleShowLoginModal}
              >
                <img src="images/icons/user.svg" alt="" className="me-1" />
              </button>
            )}
          </div>
        </div>
      </div>
      <Login login={login} handleCloseLoginModal={handleCloseLoginModal} />
      <LogOut logOut={logOut} logOutModalClose={logOutModalClose} />
    </div>
  );
}
