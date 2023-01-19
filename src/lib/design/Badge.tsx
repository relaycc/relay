import styled, {css} from "styled-components";
import {receiverTheme} from "@/lib/design/wip/receiverTheme";
import {textXsMedium} from "@/lib/design/wip/typography";


const Root = styled.div`
  display: flex;

  width: 100%;`;

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  column-gap: 0.4rem;

  border-radius: 16px;
  background-color: ${receiverTheme.colors.gray["100"]};
  padding: 2px 8px;
  height: 1.125rem;
  min-width: 3rem;
`;

const Label = styled.div<{ color: "gray" | "purple" }>`
  ${textXsMedium};
  color: ${receiverTheme.colors.primary["500"]};

  ${props => props.color === "gray" && css`
    color: ${receiverTheme.colors.gray["700"]}
  `};
`;

const Icon = styled.div<{ color: "gray" | "purple" }>`
  width: 0.375rem;
  height: 0.375rem;
  border-radius: 50%;
  background-color: ${receiverTheme.colors.primary["500"]};

  ${props => props.color === "gray" && css`
    background-color: ${receiverTheme.colors.gray["700"]}
  `};
`;

const LoadingDiv = styled.div`
  background: linear-gradient(90deg, #F1EFEF -24.18%, #F9F8F8 50.26%, #E7E5E5 114.84%);
  border-radius: 16px;
  height: 1.375rem;

  width: 3.75rem;
`;

export const Badge = ({
                          isLoading,
                          label,
                          color,
                          dot
                      }: { isLoading: boolean, label: string, color: "gray" | "purple", dot: boolean }) => {

    if (isLoading) {
        return (
            <Root>
                <LoadingDiv/>
            </Root>
        )
    }
    return (
        <Root>
            <Container>
                {dot && <Icon color={color}/>}
                <Label color={color}>{label}</Label>
            </Container>
        </Root>
    )
}