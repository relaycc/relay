import { motion } from "framer-motion";
import { useState } from "react";
import styled from "styled-components";
import { PrimaryButton } from "./ButtonPrimary";
import { SecondaryButton } from "./ButtonSecondary";
import { ChatIcon } from "./ChatIcon";
import { ExternalLinkIcon } from "./ExternalLinkIcon";
import { Logomark } from "./Logo";

const Head = styled(motion.div)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Content = styled(motion.div)`
  display: flex;
`;

const Feet = styled(motion.div)`
  display: flex;
  gap: 1rem;
`;

const CardTitle = styled(motion.div)`
  font-style: normal;
  font-weight: 700;
  font-size: 24px;
  line-height: 29px;
  text-align: center;
  color: ${(props) => props.theme.colors.gray["900"]};
}
`;

const Root = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 252px;
  height: 330px;
  padding: 1rem;
  cursor: pointer;
  background: #FFFFFF;
  border: 1px solid ${(props) => props.theme.colors.gray["200"]};
  box-shadow: 0px 1px 3px rgba(16, 24, 40, 0.1), 0px 1px 2px rgba(16, 24, 40, 0.06);
  border-radius: 8px;
  
  position: relative;

  transition: all 100ms ease-in;
  
   :hover {
     background: #EFEEFB;
     border: 1px solid #EAECF0;
     justify-content: space-between;
     
     ${CardTitle} {
       text-align: left;
     }
   }
  } 
`;

export const CardsWrapper = styled(motion.div)`
  display: grid;
  min-width: 100%;
  grid-template-columns: repeat(auto-fit, minmax(252px, 1fr));
  gap: 1rem;
`;

export const DirectoryCard = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <Root
      onMouseOver={()=>setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <Head
      initial={{}}
      animate={ isOpen && {flexDirection: "row-reverse"}}
      transition={{ delay: 0.5 }}
      >
        <Logomark width={120} height={120}/>
        <CardTitle>
          Dashboard of Creator Economy Stats
        </CardTitle>
      </Head>
      {isOpen &&
        <>
          <Content
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5 }}
          >content</Content>
          <Feet
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5 }}
          >
            <SecondaryButton>
              <ExternalLinkIcon/>
              Visit
            </SecondaryButton>
            <PrimaryButton>
              <ChatIcon/>
              Message
            </PrimaryButton>
          </Feet>
        </>
      }
    </Root>
)
}
