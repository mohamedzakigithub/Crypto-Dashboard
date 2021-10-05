import React from "react";
import { useQuery } from "react-query";
import axios from "axios";

const fetchPrices = async () => {
  const { data } = await axios.get(
    "https://api.coingecko.com/api/v3/coins/list?include_platform=false"
  );
  return data;
};

export default function Index() {
  const { status, data, error, isFetching } = useQuery("prices", fetchPrices);

  console.log(data.length);

  return <div>test</div>;
}
