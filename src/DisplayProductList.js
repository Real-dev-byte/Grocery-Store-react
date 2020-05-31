import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { API_KEY } from "./key";
export default function DisplayProductList(props) {
  const { query } = useParams();
  const [groceryList, setGroceryList] = useState([]);
  const [totalList, setTotalList] = useState([]);
  const [diet, setDiet] = useState("");
  var List = [];
  let dietList = ["Gluten Free", "Ketogenic", "Vegetarian", "Vegan"];
  useEffect(() => {
    if (props.location.state !== undefined) {
      localStorage.setItem(
        "groceries",
        JSON.stringify(props.location.state.groceries)
      );
    }
    var x = JSON.parse(localStorage.getItem("groceries"));
    console.log(x);
    x.map((item) => {
      axios({
        method: "GET",
        url: `https://api.spoonacular.com/recipes/${item.id}/information`,
        params: { apiKey: API_KEY },
      }).then((res) => {
        List.push(res.data);
        console.log(res.data);
        setGroceryList((prevGroceryList) => {
          return [...prevGroceryList, res.data];
        });
        setTotalList((prevTotalList) => {
          return [...prevTotalList, res.data];
        });
      });
    });
  }, []);

  function handleDiet(e) {
    setDiet(e.target.getAttribute("data-value"));
  }
  function resetFilters() {
    console.log(totalList);
    setGroceryList(totalList);
  }
  function makerequest() {
    let cdiet = diet
      .replace(/(?:^\w|[A-Z]|\b\w)/g, function (word, index) {
        return index === 0 ? word.toLowerCase() : word.toUpperCase();
      })
      .replace(/\s+/g, "");
    var newList = groceryList.map((item) => {
      if (item[`${cdiet}`] == true) return item;
      else return {};
    });
    var x = newList.toString();
    if (x === "") {
      console.log("insta");
      setGroceryList([]);
    } else {
      console.log(newList);
      setGroceryList(newList);
    }
  }
  return (
    <>
      <div style={{ marginBottom: "20px" }}>
        <div className="dropdown pull-left mr-3">
          <button
            class="btn btn-secondary dropdown-toggle"
            type="button"
            id="dropdownMenuButton"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            Diet
          </button>
          <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
            {dietList.map((item) => {
              return (
                <a
                  class="dropdown-item"
                  href="#"
                  data-value={item}
                  onClick={handleDiet}
                >
                  {item}
                </a>
              );
            })}
          </div>
        </div>
        <span class="input-group-btn mr-3">
          <button
            id="submitBtn"
            type="submit"
            class="btn btn-primary"
            onClick={makerequest}
          >
            Go
          </button>
        </span>
        <span class="input-group-btn">
          <button
            id="submitBtn"
            type="submit"
            class="btn btn-danger"
            onClick={resetFilters}
          >
            Remove Filter
          </button>
        </span>
      </div>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "between",
        }}
      >
        {groceryList.length > 0 ? (
          groceryList.map((item) => {
            return Object.keys(item).length !== 0 ? (
              <div
                className="card"
                style={{
                  width: "300px",
                  marginRight: "10px",
                  marginBottom: "10px",
                }}
              >
                <Link to={`/products/${query}/${item.id}`}>
                  <div className="card-image">
                    <img
                      src={item.image}
                      alt={item.title}
                      style={{
                        height: "auto",
                        width: "100%",
                        marginRight: "30px",
                      }}
                    />
                    <span className="card-title">
                      <h6>{item.title}</h6>
                    </span>
                  </div>

                  <div className="card-content">
                    <p>Ready (min): {item.readyInMinutes}</p>
                    <p>
                      <b>Price: ${item.pricePerServing}</b>
                    </p>
                  </div>
                </Link>
              </div>
            ) : (
              <div></div>
            );
          })
        ) : (
          <div>Loading...</div>
        )}
      </div>
    </>
  );
}
