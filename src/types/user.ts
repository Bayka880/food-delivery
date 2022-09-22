export type User = {
  email: string;
  phone: number;
  name: string;
  token: string;
  address: Address;
};
export type Address = {
  additional: string;
  address_type: string;
  apartment: string;
  district: string;
  khoroo: string;
  user_id: string;
  _id: string;
};
