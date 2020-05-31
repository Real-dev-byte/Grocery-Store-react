import React, { useState, useEffect } from "react";
import GrocerySearch from "./GrocerySearch";
import { Link } from "react-router-dom";
import DisplayProductList from "./DisplayProductList";
export default function Search() {
  const [query, setQuery] = useState("");
  function handleSearch(e) {
    setQuery(e.target.value);
  }
  function handleOnClick(e) {
    e.preventDefault();
    setQuery(e.target.getAttribute("data-value"));
  }
  const { groceries } = GrocerySearch(query);
  useEffect(() => {
    localStorage.clear();
  }, []);
  return (
    <>
      <div className="input-group">
        <input
          type="text"
          value={query}
          id="search-input"
          placeholder="Search..."
          onChange={handleSearch}
          className="form-control"
        />
        <div className="input-group-append">
          <Link
            to={{ pathname: `/products/${query}`, state: GrocerySearch(query) }}
          >
            <button className="btn btn-success" type="submit">
              Go
            </button>
          </Link>
        </div>
      </div>

      {groceries.length > 0 ? (
        <div className="list-group">
          {groceries.map((item) => {
            return (
              <a
                href="#"
                className="list-group-item list-group-item-action"
                data-value={item.title}
                key={item.id}
                onClick={handleOnClick}
              >
                {item.title}
              </a>
            );
          })}
        </div>
      ) : (
        <div> </div>
      )}
    </>
  );
}
