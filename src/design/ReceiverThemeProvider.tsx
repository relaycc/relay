import { FunctionComponent } from "react";
import { ThemeProvider } from "styled-components";
import { receiverTheme } from "./receiverTheme";

export const ReceiverThemeProvider: FunctionComponent<{
  children: React.ReactNode;
}> = ({ children }) => {
  return <ThemeProvider theme={receiverTheme}>{children}</ThemeProvider>;
};
