import styled from "styled-components";
import { receiverTheme } from "@/design/receiverTheme";

export const Twitter = () => {
  return <ListItem>Twitter</ListItem>;
};

export const Lens = () => {
  return <ListItem>Lens</ListItem>;
};

export const Mirror = () => {
  return <ListItem>Mirror</ListItem>;
};

export const Github = () => {
  return <ListItem>Github</ListItem>;
};

export const ListItem = styled.li`
  list-style-type: none;
  font-size: 20px;
  font-weight: 700;
  color: ${receiverTheme.colors.gray[600]};
  cursor: pointer;

  :active {
    color: ${receiverTheme.colors.gray[900]};
  }
`;

export const Discord = styled(ListItem)`
  list-style-type: none;
  font-size: 20px;
  font-weight: 700;
  color: ${receiverTheme.colors.gray[600]};
  cursor: pointer;

  :active {
    color: ${receiverTheme.colors.gray[900]};
  }
`;
