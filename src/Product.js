import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { API_KEY } from "./key";

export default function Product() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  useEffect(() => {
    axios({
      method: "GET",
      url: `https://api.spoonacular.com/recipes/${id}/information`,
      params: {
        apiKey: API_KEY,
      },
    }).then((res) => {
      console.log(res.data);
      setProduct(res.data);
    });
  }, []);
  return (
    <>
      {product ? (
        <div class="row">
          <div class="col-xs-4 item-photo">
            <img
              style={{ maxWidth: "100%", marginRight: "20px" }}
              src={product.image}
            />
          </div>
          <div class="col-xs-5">
            <h3>{product.title}</h3>
            <h5 style={{ color: "#337ab7" }}>
              <small style={{ color: "#337ab7" }}>{product.creditsText}</small>
            </h5>

            <h6 class="title-price">
              <small>PRICE PER SERVING</small>
            </h6>
            <h3 style={{ marginTop: "0px;" }}>U$ {product.pricePerServing}</h3>

            <div>
              <h6 class="title-attr" style={{ marginTop: "15px;" }}>
                <small>NUMBER OF SERVINGS</small>
              </h6>
              <div>{product.servings}</div>
            </div>
            <div style={{ paddingBottom: "5px;" }}>
              <h6 class="title-attr">
                <small>READY(min)</small>
              </h6>
              <div>{product.readyInMinutes && product.readyInMinutes}</div>
            </div>
          </div>
          <div class="col-xs-9">
            <ul class="menu-items">
              <li class="active">Details of Product</li>
            </ul>
            <div style={{ width: "100%", borderTop: "1px solid silver" }}>
              <p style={{ padding: "15px;" }}>
                <small>
                  {product.summary &&
                    product.summary.replace(/<\/?[^>]+>/gi, " ")}
                </small>
              </p>
              <h6>Instructions</h6>
              <small>
                <ol>
                  {product.instructions &&
                    product.instructions.split(".").map((item) => {
                      return <li>{item && item}</li>;
                    })}
                </ol>
              </small>
            </div>
          </div>
        </div>
      ) : (
        <div></div>
      )}
    </>
  );
}
