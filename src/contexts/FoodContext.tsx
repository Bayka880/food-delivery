import React, { createContext, useState, useContext, useEffect } from "react";
import { foodServices } from "../services/foodServices";
import { Food } from "../types/food";

const initialVal: {
  foods: Food[];
  setFoods: React.Dispatch<React.SetStateAction<Food[]>>;
} = {
  foods: [],
  setFoods: () => {},
};
export const FoodContext = createContext(initialVal);

export function useFood() {
  return useContext(FoodContext);
}

export const FoodProvider = (props: any) => {
  const [foods, setFoods] = useState<Food[]>([]);
  useEffect(() => {
    foodServices
      .getAllFood()
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          setFoods(data.data as Food[]);
        }
      })
      .finally(() => {});
  }, []);
  return (
    <FoodContext.Provider value={{ foods, setFoods }}>
      {props.children}
    </FoodContext.Provider>
  );
};
