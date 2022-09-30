import type { NextPage } from "next";
import { Profile } from "components";
import { useRouter } from "next/router";

const Home: NextPage = () => {
  const router = useRouter();
  const handle = router.query.handle as string;
  return <Profile handle={handle} />;
};

export default Home;
