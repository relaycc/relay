import styled from "styled-components";
import { receiverTheme } from "@/design/receiverTheme";
import { BackIcon } from "@/design/BackIcon";
import { StatusIcon } from "@/design/StatusIcon";
import * as ENSName from "@/design/ENSName";
import { PinIcon } from "@/design/PinIcon";
import { ButtonMinimize } from "@/design/ButtonMinimize";
import { CloseIcon } from "@/design/CloseIcon";
export * as AddressHeader from "@/design/AddressHeader";
import { useCallback } from "react";
import { Avatar } from "@/components/Avatar";
import { useRouter } from "next/router";

export const Root = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid ${receiverTheme.colors.gray["300"]};
  background-color: #ffffff;
  height: 5rem;
  padding: 0.5rem 1rem;
  column-gap: 0.5rem;

  width: 100%;
`;

export const LeftSide = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  column-gap: 0.5rem;
  max-width: 65%;
`;

export const UserDetails = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100%;
  max-width: 60%;
  row-gap: 0.25rem;
`;

export const NameAndIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  column-gap: 0.25rem;

  width: 100%;
`;

export const RightSide = styled.div`
  display: flex;
  height: 2.5rem;

  width: 30%;
`;

// export const DMHeader = ({
//   src,
//   hasLoaded,
//   ENSname,
//   addressHeader,
//   pinned,
// }: {
//   src: string;
//   hasLoaded: boolean;
//   ENSname: string;
//   addressHeader: string;
//   pinned: boolean;
// }) => {
//   const router = useRouter();
//   const navigateToDm = useCallback(() => {
//     router.push(`/receiver/messages`);
//   }, [router]);
//
//   return (
//     <Root>
//       <LeftSide>
//         <BackIcon onClick={navigateToDm} />
//         <Avatar handle={addressHeader} onClick={() => null} size="md" />
//         <UserDetails>
//           <NameAndIcon>
//             <ENSName.EnsNameMd>{ENSname}</ENSName.EnsNameMd>
//           </NameAndIcon>
//           <AddressHeader isLoading={!hasLoaded} addressHeader={addressHeader} />
//         </UserDetails>
//       </LeftSide>
//       <RightSide>
//         <PinIcon pinned={pinned} hasLoaded={hasLoaded} />
//         <ButtonMinimize />
//         <CloseIcon />
//       </RightSide>
//     </Root>
//   );
// };
