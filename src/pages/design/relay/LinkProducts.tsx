import styled from "styled-components";

export const NavLink = () => {
  return (
    <>
      <NavDropdown>
        <Title>Products</Title>
        <Svg
          width="14"
          height="8"
          viewBox="0 0 14 8"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M1 1L7 7L13 1"
            stroke="#101828"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </Svg>
      </NavDropdown>
      <LinkContainer>
        <LinkItem>Receiver</LinkItem>
      </LinkContainer>
    </>
  );
};

const NavDropdown = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
`;

const Title = styled.span`
  font-size: 16px;
  font-weight: 500;
`;

const Svg = styled.svg`
  transform: translateY(1px);
`;

const LinkContainer = styled.ul`
  list-style: none;
  background: #efeefb;
  width: 145px;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 16px;
`;
const LinkItem = styled.li``;
