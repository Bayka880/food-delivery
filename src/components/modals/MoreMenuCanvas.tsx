import React from "react";
import { Offcanvas } from "react-bootstrap";
import { Link } from "react-router-dom";
import Header from "../Header";

export default function MoreMenuCanvas(props: any) {
  return (
    <div>
      <Offcanvas
        show={props.moreMenu}
        onHide={props.handleCloseMoreMenu}
        placement={"start"}
      >
        <div className="navbar align-items-start">
          <ul className="d-flex flex-column align-items-center w-100 p-0">
            <span className="outerBox">
              <a
                href="/menu"
                className="nav-item d-flex align-items-center justify-content-between "
              >
                <span>
                  <img
                    src="images\icons\moreMenu_icon_01.svg"
                    alt="moreMenu_icon_01"
                    className="moreMenuIcons"
                  />
                  Хоолны цэс
                </span>

                <img src="images\icons\seeMoreIcon.svg" alt="" />
              </a>
              <hr className="line" />
              <a
                href="/delivery"
                className="nav-item  d-flex align-items-center justify-content-between"
              >
                <span>
                  <img
                    src="images\icons\moreMenu_icon_02.svg"
                    alt="moreMenu_icon_02"
                    className="moreMenuIcons"
                  />
                  Хүргэлтийн бүс
                </span>
                <img src="images\icons\seeMoreIcon.svg" alt="" />
              </a>
            </span>

            <span className="outerBox">
              <a
                href="/profile"
                className="nav-item d-flex align-items-center justify-content-between "
              >
                <span>
                  <img
                    src="images\icons\moreMenu_icon_03.svg"
                    alt="moreMenu_icon_03"
                    className="moreMenuIcons"
                  />
                  Хэрэглэгчийн мэдээлэл
                </span>
                <img src="images\icons\seeMoreIcon.svg" alt="" />
              </a>

              <hr className="line" />
              <a
                href="/user-order"
                className="nav-item d-flex align-items-center justify-content-between"
              >
                <span>
                  <img
                    src="images\icons\moreMenu_icon_04.svg"
                    alt="moreMenu_icon_04"
                    className="moreMenuIcons"
                  />
                  Миний захиалга
                </span>
                <img src="images\icons\seeMoreIcon.svg" alt="" />
              </a>
            </span>
          </ul>
        </div>
      </Offcanvas>
    </div>
  );
}
