import type { NextPage } from "next";
import { CardContainer, Profile } from "components";
import { useRouter } from "next/router";
import Head from "next/head";
import { useState } from 'react'

const Home: NextPage = () => {
  const router = useRouter();
  const handle = router.query.handle as string;

  return (
    <>
      <Head>
        <title>{handle}</title>
      </Head>
      <CardContainer handle={handle} ></CardContainer>
      {/* <Profile /> */}
    </>
  );
};

export default Home;
