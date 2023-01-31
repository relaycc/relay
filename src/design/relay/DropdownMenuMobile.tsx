import styled from "styled-components";
import { receiverTheme } from "@/design/receiverTheme";
import { Copy } from "@/design/Copy";

export const DropDownMenuMobile = () => {
  return (
    <Container>
      <Button>
        <svg width="17" height="18" viewBox="0 0 17 18" fill="none">
          <path
            d="M3.25 11.25H2.5C2.10218 11.25 1.72064 11.092 1.43934 10.8107C1.15804 10.5294 1 10.1478 1 9.75V3C1 2.60218 1.15804 2.22064 1.43934 1.93934C1.72064 1.65804 2.10218 1.5 2.5 1.5H9.25C9.64782 1.5 10.0294 1.65804 10.3107 1.93934C10.592 2.22064 10.75 2.60218 10.75 3V3.75M7.75 6.75H14.5C15.3284 6.75 16 7.42157 16 8.25V15C16 15.8284 15.3284 16.5 14.5 16.5H7.75C6.92157 16.5 6.25 15.8284 6.25 15V8.25C6.25 7.42157 6.92157 6.75 7.75 6.75Z"
            stroke="#101828"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
        <span>Copy Address</span>
      </Button>
      <Button>
        <svg
          width="17"
          height="16"
          viewBox="0 0 17 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M6.25 14.75H3.25C2.85218 14.75 2.47064 14.592 2.18934 14.3107C1.90804 14.0294 1.75 13.6478 1.75 13.25V2.75C1.75 2.35218 1.90804 1.97064 2.18934 1.68934C2.47064 1.40804 2.85218 1.25 3.25 1.25H6.25M11.5 11.75L15.25 8M15.25 8L11.5 4.25M15.25 8H6.25"
            stroke="#101828"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
        <span>Disconnect</span>
      </Button>
    </Container>
  );
};

const Container = styled.div`
  border-radius: 8px;
  border: 1px solid ${receiverTheme.colors.gray[100]};
  box-shadow: 0px 4px 8px -2px rgba(16, 24, 40, 0.1),
    0px 2px 4px -2px rgba(16, 24, 40, 0.06);
`;

const Button = styled.button`
  display: flex;
  gap: 9px;
  align-items: center;
  justify-content: center;
  width: 100%;
  font-size: 16px;
  padding: 13px 0px;
  border: none;
  cursor: pointer;
  background: transparent;
`;
