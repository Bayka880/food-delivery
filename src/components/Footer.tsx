// import React from "react";
import "../styles/footer.css";
import { Link } from "react-router-dom";
// import { Row, Col, Container } from "react-bootstrap";
// import Content from "./Content";

export default function Footer() {
  /*********************   Footer Component    *******************************
   *   * As the design shows
   *   * "Нүүр", "Хоолны цэс", "Хүргэлтийн бүс", "Үйлчилгээний нөхцөл",
   *     "Нууцлалын бодлого" and the icons underneeth "Бидэнтэй нэгдээрэй"
   *     are suppose to redirect to related fields
   **********************************************************************/
  return (
    <div className="footer">
      <div className="container">
        <div className="pt-1 mt-2">
          <div className="col-12">
            <div className="mt-1 d-md-flex col-md-9 col-lg-7 justify-content-between">
              <div className="footerLogo d-flex my-2 align-items-center col-md-4">
                <img src="images/icons/footerLogo.svg" alt="" />
                <p className="ms-2 m-0 ">Food Delivery</p>
              </div>
              <div className="d-flex col-md-7">
                <div className="set d-flex  m-auto flex-column col-5 mt-2">
                  <Link to="/home">Нүүр</Link>
                  <Link to="/menu">Хоолны цэс</Link>
                  <Link to="/delivery">Хүргэлтийн бүс</Link>
                </div>
                <div className="phone d-flex m-auto flex-column  mt-2">
                  <Link to="/#">Холбоо барих</Link>
                  <a href="tel:97612345678">(976) 77345678</a>
                  <a href="tel:97612345678">(976) 77345678</a>
                </div>
              </div>
            </div>
          </div>
          <div className="col-4"></div>
        </div>
        <div className="col-12 d-block d-md-flex mt-3"></div>
        <hr className="d-none d-md-flex mt-5" />
        <div className=" d-flex justify-content-between flex-column  flex-md-row">
          <div className="logos d-flex flex-column col-md-4">
            <p className="d-none d-md-flex">Бидэнтэй нэгдээрэй</p>
            <div className="book col-3 col-md-3 m-auto mt-md-1 m-md-2  justify-content-between d-flex">
              <Link to="https://facebook.com">
                <img src="images/icons/footerFbLogo.svg" alt="" />
              </Link>
              <a
                href="https://instagram.com"
                target={"_blank"}
                rel="noreferrer"
              >
                <img src="images/icons/footerInstaLogo.svg" alt="" />
              </a>
              <a href="https://twitter.com" target={"_blank"} rel="noreferrer">
                <img src="images/icons/footerTwitterLogo.svg" alt="" />
              </a>
            </div>
          </div>
          <hr className="d-flex d-md-none" />
          <div className="flex-lg-row d-flex flex-column">
            <div className="footerExpo d-flex mb-3 mt-1 flex-column flex-md-row">
              <Link to="/policy">Нууцлалын бодлого</Link>
              <Link to="/terms" className="mx-md-5 m-0">
                Үйлчилгээний нөхцөл
              </Link>
            </div>
            <div className="expo d-flex flex-column me-md-5  text-end ">
              <p className="mt-2">© 2020 MStars Foods LLC </p>
              <p className="d-none d-md-block ">
                Зохиогчийн эрх хуулиар хамгаалагдсан.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
