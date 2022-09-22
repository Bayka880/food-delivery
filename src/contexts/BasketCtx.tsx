import React, {
  createContext,
  ReactElement,
  useContext,
  useEffect,
  useState,
} from "react";
import { BasketContextType, Food } from "../types/food";
const initialVal: {
  foodBasket: Food[];
  setFoodBasket: React.Dispatch<React.SetStateAction<Food[]>>;
} = {
  foodBasket: [],
  setFoodBasket: () => {},
};
const BasketContext = createContext(initialVal);
export const useBasket: () => BasketContextType = () => {
  return useContext(BasketContext);
};
const UserProvider = ({ children }: any) => {
  const [foodBasket, setFoodBasket] = useState<Food[]>([]);

  useEffect(() => {
    if (localStorage.getItem("food")) {
      setFoodBasket(JSON.parse(localStorage.getItem("food") || "[]"));
    }
  }, []);

  useEffect(() => {
    if (foodBasket.length > 0) {
      localStorage.setItem("food", JSON.stringify(foodBasket));
    }
  }, [foodBasket]);

  return (
    <BasketContext.Provider value={{ foodBasket, setFoodBasket }}>
      {children}
    </BasketContext.Provider>
  );
};

export default UserProvider;
