import type { NextPage } from "next";
import Head from "next/head";
import { HomeView } from "../views";

const Home: NextPage = (props) => {
  return (
    <div>
      <Head>
        <title>Todo dApp</title>
        <meta name="description" content="Todo dApp on Solana" />
      </Head>
      <HomeView />
    </div>
  );
};

export default Home;
