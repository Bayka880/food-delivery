import React from "react";
import { Food, Category } from "../../types/food";
import { useFood } from "../../contexts/FoodContext";
import Card from "../../components/contents/sub-contents/Card";
import "../../styles/menu.css";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

export default function Menu() {
  let { name } = useParams();
  /*********************   Menu Component    *******************************
   *   * 4 buttons that will filter the foods and show the filtered result
   *   * Learn how the FoodContext is working and how you are getting foods
   *   * Filter all the foods and depending on wich button is clicked
   **********************************************************************/

  const { foods, setFoods } = useFood();
  const [filterFood, setFilterFood] = useState<Food[]>();
  const [categories, setCategories] = useState<Category[]>([]);
  const [select, setSelect] = useState<any>();

  useEffect(() => {
    fetch("https://dev-api.mstars.mn/api/categories")
      .then((res) => res.json())
      .then((res) => setCategories(res.data));
  }, []);

  useEffect(() => {
    const firstFood = foods.filter(
      (food) => food.category === "Үндсэн хоол" && food.discount === 0
    );

    const firstFoodCategory = foods.filter(
      (food) =>
        (food.category === name && food.discount == 0) ||
        (food.category !== name && food.discount > 0 && name === "Хямдралтай")
    );

    setFilterFood(name ? firstFoodCategory : firstFood);
    setSelect(
      name
        ? { name: name }
        : {
            name: "Үндсэн хоол",
          }
    );
  }, [foods]);

  function handlerFood(index: number, category: any) {
    setFilterFood(
      foods.filter((obj: Food) => {
        return (
          (obj.category === categories[index].name && obj.discount === 0) ||
          (obj.category !== categories[index].name &&
            categories[index].name === "Хямдралтай" &&
            obj.discount > 0)
        );
      })
    );
    setSelect(category);
  }

  return (
    <div className="container">
      <div className="tablet-desktop  my-2 d-md-flex justify-content-md-between  justify-content-xl-start">
        {categories &&
          categories.map((category: Category, index: number) => {
            return (
              <button
                id={category.name === select.name ? "btn1" : "btn2"}
                key={index}
                onClick={() => handlerFood(index, category)}
              >
                {category.name}
              </button>
            );
          })}
      </div>
      <div className="phone my-2">
        <Swiper spaceBetween={50} slidesPerView={3} navigation={true}>
          <div>
            {categories &&
              categories.map((category: Category, index: number) => {
                return (
                  <SwiperSlide key={index}>
                    <button
                      id={category.name === select.name ? "btn1" : "btn2"}
                      key={index}
                      onClick={() => handlerFood(index, category)}
                    >
                      {category.name}
                    </button>
                  </SwiperSlide>
                );
              })}
          </div>
        </Swiper>
      </div>

      <div className="row">
        {filterFood &&
          filterFood.map((food: Food, index: number) => {
            return (
              <div key={index} className="col-6 col-md-3 p-3">
                <Card oneFood={food} />
              </div>
            );
          })}
      </div>
    </div>
  );
}
