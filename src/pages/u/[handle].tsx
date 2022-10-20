import type { NextPage } from "next";
import { Profile } from "components";
import { useRouter } from "next/router";
import Head from "next/head";

const Home: NextPage = () => {
  const router = useRouter();
  const handle = router.query.handle as string;
  return (
    <>
      <Head>
        <title>{handle}</title>
      </Head>
      <Profile handle={handle}></Profile>
    </>
  );
};

export default Home;
