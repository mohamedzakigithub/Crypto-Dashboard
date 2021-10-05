import Head from "next/head";
import Home from "../components/Home";

export default function Index() {
  return (
    <>
      <Head>
        <title>Cryptocurrency Dashboard</title>
        <meta name="description" content="Cryptocurrency Dashboard" />
      </Head>
      <Home />
    </>
  );
}
