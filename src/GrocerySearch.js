import { useEffect, useState } from "react";
import axios from "axios";
import { API_KEY } from "./key";
export default function GrocerySearch(query) {
  const [groceries, setGroceries] = useState([]);
  useEffect(() => {
    setGroceries([]);
  }, [query]);
  useEffect(() => {
    let cancel;
    axios({
      method: "GET",
      url: "https://api.spoonacular.com/recipes/complexSearch",
      params: {
        apiKey: API_KEY,
        query: query,
        number: 3,
      },
      cancelToken: new axios.CancelToken((c) => (cancel = c)),
    })
      .then((res) => {
        setGroceries((prevGroceries) => {
          return [...new Set([...prevGroceries, ...res.data.results])];
        });
      })
      .catch((e) => {
        if (axios.isCancel(e)) return;
      });
    return () => cancel();
  }, [query]);
  return { groceries };
}
