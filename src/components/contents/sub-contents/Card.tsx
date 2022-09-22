import { CardProps } from "../../../types/food";
import "../../../styles/card.css";
import CardModal from "./CardModal";

export default function Card(props: CardProps) {
  /***************************   SINGLE FOOD INFORMATION    **********************
   *   * Responsive card design
   *   * Card information is coming from props!
   *   * Short information about food
   *   * On click open up CardModal of targeted food
   *******************************************************************************/

  return (
    <div className="card border-0">
      <div className="hovver d-flex justify-content-center align-items-center">
        <CardModal food={props.oneFood} />
      </div>
      <div className="card-body p-0">
        <div className="position-relative">
          {props.oneFood.discount ? (
            <p className="position-absolute percent">
              {props.oneFood.discount}%
            </p>
          ) : (
            <p className="m-0"> </p>
          )}

          <div className="cardImage">
            <img
              src={`https://mtars-fooddelivery.s3.ap-southeast-1.amazonaws.com${props.oneFood.image}`}
              alt=""
              className="w-100"
            />
          </div>
        </div>
        <div className="text-start">
          <h5 className="card-title m-0 my-1">{props.oneFood.name}</h5>
          <div className="d-flex">
            {props.oneFood.discount ? (
              <div className="d-flex">
                <p className="card-text m-0 c1">
                  {props.oneFood.price -
                    (props.oneFood.price * props.oneFood.discount) / 100}
                  ₮
                </p>
                <p className=" m-0 mx-2 line">{props.oneFood.price}₮</p>
              </div>
            ) : (
              <div>
                <p className="card-text m-0 c1">{props.oneFood.price}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
