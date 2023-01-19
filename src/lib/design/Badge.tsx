import styled, {css} from "styled-components";
import {receiverTheme} from "@/lib/design/wip/receiverTheme";
import {textXsMedium} from "@/lib/design/wip/typography";


const Root = styled.div<{ color: "gray" | "purple" }>`
  display: flex;
  justify-content: center;
  align-items: center;
  column-gap: 0.4rem;

  background-color: #F4F3FF;

  ${props => props.color === "gray" && css`
    background-color: ${receiverTheme.colors.gray["100"]}
  `};

  border-radius: 16px;
  padding: 2px 8px;
  height: 1.375rem;
  min-width: 3rem;
`;

const Label = styled.div<{ color: "gray" | "purple" }>`
  ${textXsMedium};
  color: ${receiverTheme.colors.primary["500"]};

  ${props => props.color === "gray" && css`
    color: ${receiverTheme.colors.gray["700"]};
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
  mix-blend-mode: multiply;
  border-radius: 16px;
  height: 1.375rem;

  width: 3.75rem;
`;

export const Badge = ({
                          hasLoaded,
                          label,
                          color,
                          dot
                      }: { hasLoaded: boolean, label: string, color: "gray" | "purple", dot: boolean }) => {

    if (hasLoaded) {
        return (
            <Root color={color}>
                {dot && <Icon color={color}/>}
                <Label color={color}>{label}</Label>
            </Root>
        )
    }
    return (
        <LoadingDiv/>
    )
}