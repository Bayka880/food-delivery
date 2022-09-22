import React from "react";
import ReactDOM from "react-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import App from "./App";
import { FoodProvider } from "./contexts/FoodContext";
import "bootstrap/dist/css/bootstrap.min.css";
import "leaflet/dist/leaflet.css";
import { BrowserRouter } from "react-router-dom";
import BasketProvider from "./contexts/BasketCtx";
import { SearchProvider } from "./contexts/SearchCtx";
import { UserProvider } from "./contexts/UserCtx";
import { LoadingProvider } from "./contexts/LoadingCtx";
ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <FoodProvider>
        <BasketProvider>
          <SearchProvider>
            <UserProvider>
              <LoadingProvider>
                <App />
              </LoadingProvider>
            </UserProvider>
          </SearchProvider>
        </BasketProvider>
      </FoodProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
