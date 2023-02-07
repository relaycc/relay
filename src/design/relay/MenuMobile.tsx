import styled from "styled-components";

export * from "@/design/relay/Logo";
import * as ButtonPrimary from "@/design/relay/ButtonPrimary";
import { motion } from "framer-motion";
import { ComponentProps } from "react";

export const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  padding: 0.5rem;
  display: flex;
`;

export const Root = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: center;
  flex-grow: 1;
  background: #efeefb;
  border: 1px solid #d0d5dd;
  border-radius: 8px;
  padding: 1rem;
  overflow-y: auto;
`;

export const Products = styled.h6`
  height: 22px;
  font-style: normal;
  font-weight: 900;
  font-size: 16px;
  line-height: 22px;
  text-align: center;
  color: #98a2b3;
  margin: 0;
  margin-bottom: 1rem;
  margin-top: 1rem;
`;
export const RightWrapper = styled.div`
  display: flex;
  max-width: 3.5rem;
  flex: 1;
  justify-content: space-between;
  align-items: center;
`;
export const SocialItem = styled.div`
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 22px;
  color: ${(p) => p.theme.colors.gray["900"]};
  cursor: pointer;
  padding: 8px;
  height: 2.375rem;
`;

export const ConnectButton = styled(ButtonPrimary.ButtonPrimary)`
  margin-top: auto;
  width: 100%;
`;

/* ***************************************************************************
 *
 * Prduct Buttons
 *
 * **************************************************************************/

export const ProductButton = styled.button`
  display: flex;
  gap: 9px;
  align-items: center;
  justify-content: center;
  width: 100%;
  font-size: 16px;
  padding: 13px 0px;
  border: none;
  cursor: pointer;
  background: ${(p) => p.theme.colors.primary[100]};
  color: ${(p) => p.theme.colors.primary[500]};
  border-radius: 8px;
  margin-bottom: 0.5rem;

  :hover {
    background-color: ${(p) => p.theme.colors.primary[300]};
  }
`;

export const MenuIcon = styled((props: ComponentProps<"svg">) => (
  <svg width="20" height="14" viewBox="0 0 20 14" {...props} cursor={"pointer"}>
    <path
      d="M1 7H15M1 1H19M1 13H19"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
))`
  stroke: ${(p) => p.theme.colors.gray[900]};
`;
