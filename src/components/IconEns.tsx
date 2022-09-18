import EnsLogo from "../../public/ENS.svg";
import Image from "next/image";

export const IconEns = () => {
  return <Image src={EnsLogo} alt="ENS logo" height={80} width={80} />;
};
