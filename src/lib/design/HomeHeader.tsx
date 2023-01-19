import styled from "styled-components";
import {StatusIcon} from "@/lib/design/StatusIcon";
import {Compose} from "@/lib/design/Compose";
import {receiverTheme} from "@/lib/design/wip/receiverTheme";
import {displayXsBold} from "@/lib/design/wip/typography";


const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.5rem 1rem;
  height: 5.5rem;
  border-bottom: 1px solid ${receiverTheme.colors.gray["200"]};
  background-color: #FFFFFF;

  width: 100%;
`;

const Title = styled.div`
  ${displayXsBold};
  color: ${receiverTheme.colors.gray["900"]};
`;

const IconContainer = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  column-gap: 0.75rem;
`;

export const HomeHeader = ({src, isLoading}: { src: string, isLoading: boolean }) => {
    return (
        <Container>
            <Title>Messages</Title>
            <IconContainer>
                <StatusIcon size={"sm"}
                            src={src}
                            isLoading={isLoading}/>
                <Compose/>
            </IconContainer>
        </Container>
    );
};
