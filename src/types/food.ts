import { type } from "os";

export type Food = {
  name: string;
  category: string;
  category_id: string;
  discount: number;
  image: string;
  price: number;
  sales: boolean;
  ingredients: string;
  quantity: number;
  _id: string;
  product_id: string;
};

export type CardProps = {
  oneFood: Food;
};
export type MenuProps = {
  food: Food;
};

export type ModalProps = {
  food: Food;
};
export type Category = {
  name: string;
};

export type UserOrdeType = {
  order: {
    address: UserAddress;
    created_date: string;
    orderDetails: [UserOrdeDetailType];
    payment_type: string;
    phone: number;
    status: string;
    total_price: number;
    user_id: string;
    _id: string;
  };
};

export type UserOrdeDetailType = {
  food_id: string;
  food_name: string;
  order_id: string;
  price: number;
  qty: number;
  _id: string;
};

export type UserAddress = {
  additional: string;
  address_type: string;
  apartment: string;
  district: string;
  khoroo: string;
  user_id: string;
  __v: number;
  _id: string;
};

export type Address = { district: string; apartment: string; street: string };
export type BasketContextType = {
  foodBasket: Food[];
  setFoodBasket: React.Dispatch<React.SetStateAction<Food[]>>;
};
