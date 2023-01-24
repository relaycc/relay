import styled from "styled-components";
export { CloseIcon } from "./CloseIcon";

export const Root = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0px 16px;
  height: 80px;
  box-shadow: 0px 1px 3px rgba(16, 24, 40, 0.1),
    0px 1px 2px rgba(16, 24, 40, 0.06);
`;

export const Title = styled.div`
  font-size: 24px;
  font-weight: 700;
`;

export const Button = styled.button`
  background-color: transparent;
  border-radius: 50%;
  cursor: pointer;
  padding: 0px;
  border: 0px;
  display: grid;
  place-content: center;
`;

// export export const NewMessageHeader = ({
//   handleCloseClick,
// }: NewMessageHeaderProps) => {
//   return (
//     <Container>
//       <Title>New Message</Title>
//       <Button onClick={handleCloseClick}>
//         <CloseIcon />
//       </Button>
//     </Container>
//   );
// };
