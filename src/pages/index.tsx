import type { NextPage } from "next";
import { Profile } from "components";
import { useAccount } from "wagmi";

const Home: NextPage = () => {
  const account = useAccount();
  return <Profile handle={account.address} />;
};

export default Home;
