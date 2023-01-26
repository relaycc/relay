import { motion } from "framer-motion";
import styled from "styled-components";

export const Root = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-width: 310px;
  height: 352px;
  cursor: grab;
  background-color: grey;
  border-radius: 16px;
  box-shadow: 0px 1px 3px rgba(16, 24, 40, 0.1), 0px 1px 2px rgba(16, 24, 40, 0.06);
  
  position: relative;
`;

export const CardLabelWrapper = styled(motion.div)`
  position: absolute;
  bottom: 0;
  
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.5rem 0.5rem;
  border-bottom: 1px solid black;
  margin-bottom: 1rem;
`

export const CardLabel = styled.label`
  font-style: normal;
  font-weight: 900;
  font-size: 20px;
  line-height: 27px;
  color: ${(props) => props.theme.colors.gray["900"]};
}
`;

