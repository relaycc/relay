import styled from "styled-components";
import { receiverTheme } from "@/design/receiverTheme";

export const DropdownMobile = () => {
  return (
    <Button>
      <svg
        width="17"
        height="18"
        viewBox="0 0 17 18"
        fill="none"
      >
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
  );
};

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

  :hover {
    background-color: ${receiverTheme.colors.gray[100]};
  }
`;
