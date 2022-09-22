import React from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import "../../styles/delivery.css";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";

const DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
});
L.Marker.prototype.options.icon = DefaultIcon;
export default function DeliveryZone() {
  let point1 = new L.LatLng(47.92046709119524, 106.91276044184455);
  let point2 = new L.LatLng(47.923846861548455, 106.93417406801953);
  return (
    <div className="container">
      <MapContainer center={point1} zoom={15} id="map">
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={point1}>
          <Popup>
            Food Delivery restaurant <br /> Тав тухтай орчин таныг хүлээж байна.
          </Popup>
        </Marker>
        <Marker position={point2}>
          <Popup>
            Mstars HUB <br /> Mstar Academy
          </Popup>
        </Marker>
      </MapContainer>
      <div className="container d-inline d-md-none d-lg-none">
        <div className="d-flex align-items-center pt-4">
          <div id="rectangle"></div>
          <div className="ps-2 deliveryzone">ХҮРГЭЛТИЙН БҮС</div>
        </div>
        <p className="mapSection pt-4">"A" бүс</p>
        <div className="asection">
          <div className="d-flex align-items-center pt-3 px-3">
            <img src="./images/icons/location.svg" alt="" />
            <div>Хоймор хотхон</div>
          </div>
          <hr />
          <div className="d-flex align-items-center  pt-3 px-3">
            <img src="./images/icons/location.svg" alt="" />
            <div>45-р байр</div>
          </div>
          <hr />
          <div className="d-flex align-items-center  pt-3 px-3">
            <img src="./images/icons/location.svg" alt="" />
            <div>Оранж хотхон</div>
          </div>
          <hr />
          <div className="d-flex align-items-center  pt-3 px-3">
            <img src="./images/icons/location.svg" alt="" />
            <div>3-р байр</div>
          </div>
          <hr />
          <div className="d-flex align-items-center  pt-3 px-3 pb-3">
            <img src="./images/icons/location.svg" alt="" />
            <div>33-р байр</div>
          </div>
        </div>
        <p className="mapSection pt-4">"Б" бүс</p>
        <div className="asection">
          <div className="d-flex align-items-center pt-3 px-3">
            <img src="./images/icons/location.svg" alt="" />
            <div>Хоймор хотхон</div>
          </div>
          <hr />
          <div className="d-flex align-items-center  pt-3 px-3">
            <img src="./images/icons/location.svg" alt="" />
            <div>45-р байр</div>
          </div>
          <hr />
          <div className="d-flex align-items-center  pt-3 px-3">
            <img src="./images/icons/location.svg" alt="" />
            <div>Оранж хотхон</div>
          </div>
          <hr />
          <div className="d-flex align-items-center  pt-3 px-3">
            <img src="./images/icons/location.svg" alt="" />
            <div>3-р байр</div>
          </div>
          <hr />
          <div className="d-flex align-items-center  pt-3 px-3 pb-3">
            <img src="./images/icons/location.svg" alt="" />
            <div>33-р байр</div>
          </div>
        </div>
      </div>
      <div className="container d-none d-md-inline ">
        <div className="d-flex align-items-center">
          <div id="rectangle"></div>
          <div className="ps-2 deliveryzone1">Хүргэлтийн бүс дэх хаягууд</div>
        </div>
        <div className="row">
          <div className="col-sm-12 col-lg-6">
            <div className="d-flex align-items-center pt-4 tabletdel justify-content-around mt-4 p-4 ">
              <div className="d-flex align-items-center">
                <div id="rectangle"></div>
                <div className="deliveryzonea ps-3">"A" бүс</div>
              </div>
              <div className="locations">
                <div>Нархан хотхон</div>
                <div>26-р байр</div>
                <div>Хоймор хотхон</div>
                <div>45-р байр</div>
                <div>44-р байр</div>
                <div>3-р байр</div>
                <div>Хоймор хотхон</div>
                <div>45-р байр </div>
              </div>
              <div className="locations">
                <div>Нархан хотхон</div>
                <div>26-р байр</div>
                <div>Хоймор хотхон</div>
                <div>45-р байр</div>
                <div>44-р байр</div>
                <div>3-р байр</div>
                <div>Хоймор хотхон</div>
                <div>45-р байр </div>
              </div>
            </div>
          </div>
          <div className="col-sm-12 col-lg-6">
            <div className="d-flex align-items-center pt-4 tabletdel justify-content-around mt-4 p-4 ">
              <div className="d-flex align-items-center">
                <div id="rectangle"></div>
                <div className="deliveryzonea ps-3">"Б" бүс</div>
              </div>
              <div className="locations">
                <div>Нархан хотхон</div>
                <div>26-р байр</div>
                <div>Хоймор хотхон</div>
                <div>45-р байр</div>
                <div>44-р байр</div>
                <div>3-р байр</div>
                <div>Хоймор хотхон</div>
                <div>45-р байр </div>
              </div>
              <div className="locations">
                <div>Нархан хотхон</div>
                <div>26-р байр</div>
                <div>Хоймор хотхон</div>
                <div>45-р байр</div>
                <div>44-р байр</div>
                <div>3-р байр</div>
                <div>Хоймор хотхон</div>
                <div>45-р байр </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
