import React, { useState } from "react";
import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Search from "./Search";
import DisplayProductList from "./DisplayProductList";
import Product from "./Product";
export default function App() {
  return (
    <>
      <Router>
        <div className="container">
          <h2 className="heading"> Grocery Store </h2>
          <br />
          <Route exact path="/" exact component={Search} />
          <Route
            exact
            path="/products/:query"
            exact
            component={DisplayProductList}
          />
          <Route path="/products/:query/:id" exact component={Product} />
        </div>
      </Router>
    </>
  );
}
