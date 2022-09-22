import "../../styles/slide.css";
import "../../styles/mainCard.css";
import Carousel from "react-bootstrap/Carousel";
import { useEffect, useState } from "react";
import { Category, Food } from "../../types/food";
import Card from "./sub-contents/Card";
import { useFood } from "../../contexts/FoodContext";
import "../../styles/container.css";
import { useNavigate } from "react-router-dom";
import { useLoading } from "../../contexts/LoadingCtx";
import Loading from "../Loading";

export default function Main() {
  const { foods, setFoods } = useFood();
  const [categories, setCategories] = useState<Category[]>([]);
  const { loading, setLoading } = useLoading();

  useEffect(() => {
    setLoading(true);
    fetch("https://dev-api.mstars.mn/api/categories")
      .then((res) => res.json())
      .then((res) => changeOrder(res.data))
      .then((data) => setCategories(data))
      .finally(() => {
        setLoading(false);
      });
  }, []);

  function changeOrder(arr: any) {
    arr.unshift(arr.pop());
    return arr;
  }

  let navigate = useNavigate();
  function handler(name: string) {
    navigate(`/menu/${name}`);
  }

  return (
    <div>
      <div className="bannerSlide">
        <Carousel>
          <Carousel.Item interval={30000}>
            <div className="bannerImage">
              <div className="leftSide">
                <img src="./images/pictures/doodtal.png" alt="huurga" />
                <img src="./images/pictures/dedtal.png" alt="ramen" />
              </div>
              <div className="rigthSide">
                <p>MStars Food delivery</p>
                <hr />
                <p id="slideText">Хосгүй амтыг хормын дотор хүргэж өгнө.</p>
              </div>
            </div>
          </Carousel.Item>
          <Carousel.Item interval={30000}>
            <div className="bannerImage1">
              <p id="slideTextComing">Тун удахгүй...</p>
            </div>
          </Carousel.Item>
          <Carousel.Item interval={30000}>
            <div className="bannerImage2">
              <p id="sliderTextSet">Сэт хоол гарч эхэллээ.</p>
            </div>
          </Carousel.Item>
        </Carousel>
      </div>

      <div className="featuresInfo">
        <div className="features">
          <div className="featuresContent container">
            <div className="featuresSec ps-4">
              <img
                src="./images/pictures/featuresImage/clock.svg
            "
                alt="clock"
              />
              <div className="secT">
                <p>Шуурхай хүргэлт</p>
                <p>30 минутанд таны гарт.</p>
              </div>
            </div>
            <div className="featuresSec ps-4">
              <img src="./images/pictures/featuresImage/soup.svg" alt="soup" />
              <div className="secT">
                <p>Эрүүл баталгаат орц</p>
                <p>Хамгийн чанартайг танд.</p>
              </div>
            </div>
            <div className="featuresSec ps-4">
              <img src="./images/pictures/featuresImage/book.svg" alt="book" />
              <div className="secT">
                <p>Өргөн сонголт</p>
                <p>Хамгийн онцгойг танд</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      {loading ? (
        <Loading />
      ) : (
        categories &&
        categories.map((value: Category, index: number) => {
          return (
            <div key={index} className="container">
              <div className="d-flex justify-content-between pt-4 container mb-3">
                <div className="d-flex align-items-center">
                  <div id="rectangle"></div>
                  <h2>{value.name}</h2>
                </div>
                <button
                  id="buttonWindow"
                  className="d-none d-lg-inline d-flex align-items-center"
                  onClick={() => handler(value.name)}
                >
                  <span> Бүгдийг харах</span> <span>&gt;</span>
                </button>
                <button
                  id="buttonSmall"
                  className="d-sm-inline d-md-inline d-lg-none"
                  onClick={() => handler(value.name)}
                >
                  &gt;
                </button>
              </div>
              <div className="row">
                {foods &&
                  foods
                    .filter(
                      (food: Food) =>
                        food.discount > 0 && value?.name === "Хямдралтай"
                    )
                    .map((dish: Food, i: number) => {
                      return (
                        <div key={i} className="col-6 col-md-3 p-3">
                          <Card oneFood={dish} />
                        </div>
                      );
                    })}

                {foods &&
                  foods
                    .filter(
                      (food: Food) =>
                        value?.name !== "Хямдралтай" &&
                        food.discount <= 0 &&
                        value?.name === food.category
                    )
                    .slice(0, 4)
                    .map((dish: Food, i: number) => {
                      return (
                        <div key={i} className="col-6 col-md-3 p-3">
                          <Card oneFood={dish} />
                        </div>
                      );
                    })}
              </div>
            </div>
          );
        })
      )}
    </div>
  );
}
