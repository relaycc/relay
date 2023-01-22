import styled from "styled-components";
import { useState } from "react";

interface CopyProps {
  hoverText: string;
  onCopy: () => void;
  isLoading: boolean;
}

const Svg = styled.svg`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const MessageBubble = styled.div<{ isClicked: boolean }>`
  display: ${({ isClicked }) => (isClicked ? "block" : "none")};
  position: absolute;
  padding: 8px;
  border-radius: 8px;
  white-space: nowrap;
  top: -45px;
  left: 50%;
  min-width: 48px;
  min-height: 31px;
  transform: translateX(-50%);
  background-color: white;
  box-shadow: 0px 1px 3px rgba(16, 24, 40, 0.1),
    0px 1px 2px rgba(16, 24, 40, 0.06);
  font-size: 12px;

  :before {
    height: 0px;
    width: 0px;
    position: absolute;
    background-color: white;
    content: "";
    left: 50%;
    transform: translateX(-50%);
    top: 24px;
    border-left: 15px solid transparent;
    border-right: 14px solid transparent;
    border-top: 14px solid white;
    background-color: transparent;
  }
`;

const MessageBubblePoint = styled.div<{ isClicked: boolean }>`
  display: ${({ isClicked }) => (isClicked ? "block" : "none")};
  height: 12px;
  width: 12px;
  position: absolute;
  border-radius: 1px;
  left: 50%;
  top: -21px;
  transform: translateX(-50%) rotate(45deg);
  background-color: white;
  box-shadow: 1px 1px 3px rgba(16, 24, 40, 0.1),
    1px 1px 2px rgba(16, 24, 40, 0.06);
`;

const Button = styled.button<{ isClicked: boolean }>`
  position: relative;
  background-color: #ecfdf3;
  border: none;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  cursor: pointer;
  padding: 10px;
  transition: background-color 150ms ease-in;
  pointer-events: ${({ isClicked }) => (isClicked ? "none" : "visible")};

  :hover {
    background-color: #eaecf0;

    ${MessageBubble} {
      display: block;
    }
    ${MessageBubblePoint} {
      display: block;
    }
  }
  :active {
    background-color: #d0d5dd;
  }
`;

const LoadingImg = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: linear-gradient(
    90deg,
    #f1efef -24.18%,
    #f9f8f8 50.26%,
    #e7e5e5 114.84%
  );
`;

export const Copy = ({ hoverText, onCopy, isLoading }: CopyProps) => {
  const [isClicked, setIsClicked] = useState(false);

  const handleAllowClicking = () => {
    setIsClicked(false);
  };

  const handleClick = () => {
    setIsClicked(true);
    onCopy();
    setTimeout(handleAllowClicking, 2000);
  };
  
  return isLoading ? (
    <LoadingImg />
  ) : (
    <Button isClicked={isClicked} onClick={handleClick}>
      <MessageBubblePoint isClicked={isClicked} />
      <MessageBubble isClicked={isClicked}>
        {isClicked && "Copied!"}
        {isClicked || hoverText}
      </MessageBubble>
      <Svg width="22" height="22" viewBox="0 0 22 22" fill="none">
        <path
          d="M4 14H3C2.46957 14 1.96086 13.7893 1.58579 13.4142C1.21071 13.0391 1 12.5304 1 12V3C1 2.46957 1.21071 1.96086 1.58579 1.58579C1.96086 1.21071 2.46957 1 3 1H12C12.5304 1 13.0391 1.21071 13.4142 1.58579C13.7893 1.96086 14 2.46957 14 3V4M10 8H19C20.1046 8 21 8.89543 21 10V19C21 20.1046 20.1046 21 19 21H10C8.89543 21 8 20.1046 8 19V10C8 8.89543 8.89543 8 10 8Z"
          stroke="#101828"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </Svg>
    </Button>
  );
};
