import React, { createContext, useContext, useEffect, useState } from "react";
import { User } from "../types/user";

const initialVal: {
  user: User | null;
  setUsers: React.Dispatch<React.SetStateAction<User | null>>;
} = {
  user: null,
  setUsers: () => {},
};

export const UserContext = createContext(initialVal);

export function useUser() {
  return useContext(UserContext);
}

export const UserProvider = (props: any) => {
  const [user, setUsers] = useState<User | null>(null);

  useEffect(() => {
    if (localStorage.getItem("user")) {
      setUsers(JSON.parse(localStorage.getItem("user") || ""));
    }
  }, []);

  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
  }, [user]);

  return (
    <UserContext.Provider value={{ user, setUsers }}>
      {props.children}
    </UserContext.Provider>
  );
};
export default UserProvider;
