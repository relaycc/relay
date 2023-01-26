import { useState } from "react";
import * as Card from "./Card"
import { RobotLensIcon } from "./RobotLensIcon";

export const CardLens = ({handleClick} : {handleClick?: () => void} ) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <Card.Root
      onClick={handleClick}
      onMouseOver={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
      initial={{backgroundColor: "#ABFD2C"}}
      animate={ isOpen ? {
        backgroundColor: "#ABFD2C"
      } : {backgroundColor: "#EFFFD6"}}
    >
      <RobotLensIcon/>
      {isOpen &&
        <Card.CardLabelWrapper
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5 }}
        >
          <Card.CardLabel>
            Message the Lens 🤖
          </Card.CardLabel>
        </Card.CardLabelWrapper>
      }
    </Card.Root>
  )
}