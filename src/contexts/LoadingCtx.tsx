import React, { createContext, useContext, useState } from "react";

const initialVal: {
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
} = {
  loading: false,
  setLoading: () => {},
};

export const LoadingContext = createContext(initialVal);
export function useLoading() {
  return useContext(LoadingContext);
}

export const LoadingProvider = (props: any) => {
  const [loading, setLoading] = useState<boolean>(false);

  return (
    <LoadingContext.Provider value={{ loading, setLoading }}>
      {props.children}
    </LoadingContext.Provider>
  );
};
export default LoadingProvider;
