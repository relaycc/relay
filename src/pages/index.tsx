import type { NextPage } from "next";
import { PageProfilesCards } from "components";
import { useAccount } from "wagmi";

const Home: NextPage = () => {
  const account = useAccount();
  return <PageProfilesCards handle={account.address} />;
};

export default Home;
