import React from "react";
import { useQuery } from "react-query";
import axios from "axios";

const fetchPrices = async () => {
  const { data } = await axios.get(
    "https://jsonplaceholder.typicode.com/posts"
  );
  return data;
};

export default function Index() {
  const { status, data, error, isFetching } = useQuery("prices", fetchPrices);

  return <div>test</div>;
}
