import * as Card from "@/design/relay/Card";

export interface Robot {
  peerAddress: string;
  icon: React.FC;
  initialBgColor: string;
  animateBgColor: string;
}

export const ROBOT_CARDS: Record<string, Robot> = {
  uniswap: {
    peerAddress: "0x59690cA7049125975FF957ED711875de47E0C716",
    icon: Card.Uniswap,
    initialBgColor: "#FE007A",
    animateBgColor: "#FFD6EA",
  },
  sushi: {
    peerAddress: "0xe7B53FFEF48934040273ede0a5112De73B1eEFFc",
    icon: Card.SushiSwap,
    initialBgColor: "#0E0F23",
    animateBgColor: "#E2E3F3",
  },
  litprotocol: {
    peerAddress: "0xc02EfDcef6eE1f46d6C39247cf84996c40D4FBEA",
    icon: Card.Lit,
    initialBgColor: "#ECA368",
    animateBgColor: "#FBE9DB",
  },
  ens: {
    peerAddress: "0x6dD676Ab1eA02cE3b011aEa1C4a147D77112e0Ce",
    icon: Card.Ens,
    initialBgColor: "#689EF6",
    animateBgColor: "#D8DFFD",
  },
  xmtp: {
    peerAddress: "0xaF43C826F978b3cF01b3F2ea5a7574C521FE38A9",
    icon: Card.Xmtp,
    initialBgColor: "#5A2895",
    animateBgColor: "#E9D6FF",
  },
  gitcoin: {
    peerAddress: "0x5cb9d7dA962c136682BFf1EB940Aa196B69b4FE6",
    icon: Card.Gitcoin,
    initialBgColor: "#63DCA2",
    animateBgColor: "#DEF7EB",
  },
  metamask: {
    peerAddress: "0xed2559B4B4cfF1d8Ad17FEe106D160cc4Ca1eAB2",
    icon: Card.Metamask,
    initialBgColor: "#233447",
    animateBgColor: "#E4EAF2",
  },
  opensea: {
    peerAddress: "0xd09FD3595726477bbc310048C907324A1EC9c02D",
    icon: Card.OpenseaIcon,
    initialBgColor: "#2081E2",
    animateBgColor: "#DCE3F9",
  },
  poap: {
    peerAddress: "0xf7930c06266004306b645141CeFEBFD54c09e8C2",
    icon: Card.Poap,
    initialBgColor: "#9E6EF6",
    animateBgColor: "#DDD6FF",
  },
  lens: {
    peerAddress: "0xCd62db59bB7ee6882B4e60115C3cBFCd5f5eCE2e",
    icon: Card.LensIcon,
    initialBgColor: "#ABFD2C",
    animateBgColor: "#EFFFD6",
  },
  alchemy: {
    peerAddress: "0x1836EC2743aB44127D951dc44D5b6fEf700E0eb8",
    icon: Card.Alchemy,
    initialBgColor: "#4609FA",
    animateBgColor: "#E1D7FE",
  },
  sound: {
    peerAddress: "0xbd2A92E29f640D34Ce4ce2fEc03F9fb523B872da",
    icon: Card.Sound,
    animateBgColor: "#EBEBEB",
    initialBgColor: "#000000",
  },
  walletconnect: {
    peerAddress: "0xE1fF3F7CB42E8a4cBb0f25912E8040d9f9F23F2a",
    icon: Card.WalletConnect,
    animateBgColor: "#D6EAFF",
    initialBgColor: "#3396FF",
  },
  makerdao: {
    peerAddress: "0x7b221A29986D810bB795B0f53feEC32FbC2ff4C4",
    icon: Card.MakerDao,
    animateBgColor: "#E3F2F0",
    initialBgColor: "#55B0A1",
  },
};
