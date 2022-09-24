import type { NextPage } from "next";
import { PageProfilesCards } from "components";
import {
  useEnsAddress,
  useLensAddress,
  isLensName,
  isEnsName,
  isEthAddress,
} from "@relaycc/receiver";
import { useRouter } from "next/router";

const Home: NextPage = () => {
  const router = useRouter();
  const handle = router.query.handle as string;
  return <PageProfilesCards handle={handle} />;
};

export default Home;
