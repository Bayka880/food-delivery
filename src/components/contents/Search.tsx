import React from "react";
import { useFood } from "../../contexts/FoodContext";
import { useSearch } from "../../contexts/SearchCtx";
import Card from "./sub-contents/Card";

export default function Search(props: any) {
  /*********************   Search  ***********************************
   *   * filters the food with given text and show all the filtered foods
   *   * Do not forgot to include not found screen!
   **********************************************************************/
  const { searchTerm, setSearchTerm } = useSearch();
  const { foods, setFoods } = useFood();

  const result = foods.filter((food) => {
    return Object.values(food)
      .join("")
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
  });

  return (
    <div className="container m-auto">
      <div className="d-flex justify-content-start align-items-center search-result ">
        <p className="m-0 orange-text">Хайлт</p>
        <img src="images/icons/seeMoreIcon.svg" alt="" className="px-2" />
        {searchTerm}
      </div>
      <div className="row">
        {result[0] ? (
          result.map((e, i) => {
            return (
              <div className="col-6 col-md-3 p-2" key={i}>
                {<Card oneFood={e} />}
              </div>
            );
          })
        ) : (
          <div className="text-center no-result">
            <img src="images/icons/noResult.svg" alt="" />
            <p>Уучлаарай, илэрц олдсонгүй...</p>
          </div>
        )}
      </div>
    </div>
  );
}
