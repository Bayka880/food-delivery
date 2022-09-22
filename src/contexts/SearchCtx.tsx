import React, { createContext, useContext, useEffect, useState } from "react";

const initialVal: {
  searchTerm: string;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
} = {
  searchTerm: "",
  setSearchTerm: () => {},
};

export const SearchContext = createContext(initialVal);

export function useSearch() {
  return useContext(SearchContext);
}

export const SearchProvider = (props: any) => {
  const [searchTerm, setSearchTerm] = useState<string>("");

  return (
    <SearchContext.Provider value={{ searchTerm, setSearchTerm }}>
      {props.children}
    </SearchContext.Provider>
  );
};
