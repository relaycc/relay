import styled from "styled-components";
import { ButtonView } from "@/lib/design/ButtonView";
import Link from "next/link";

const VERY_LONG_TEXT =
  "Very long text that will be truncated. This is the longest text of all time and I can't believe that it's overlfowing the container.";
const MEDIUM_TEXT = "Medium text that might be truncated.";
const SHORT_TEXT = "Short text";
const EMPTY_TEXT = "";

export default function DesignButtonView () {
    return (
        <ComponentSection>
        <ComponentSectionHeader>
          <ComponentSectionTitle>ButtonView</ComponentSectionTitle>
          <FigmaLink>
            Figma Link:{" "}
            <Link
              href="https://www.figma.com/file/EZOEJ9JRgoJObOEQsf6NqV/Relay's-Design-System?t=0qDhgsZoj2XintxJ-0"
              target={"_blank"}
            >ButtonView
            </Link>
          </FigmaLink>
        </ComponentSectionHeader>
        <Receiver>
          <div style={{ overflow: "scroll", height: "695px" }}>
            <h2> Primary </h2>
            <br />
            <span>Small enabled</span>
            <ButtonView
              hierarchy={"primary"}
              size={"sm"}
              label={EMPTY_TEXT}
              handleClick={() => null}
              disabled={false}
            />
            <ButtonView
              hierarchy={"primary"}
              size={"sm"}
              label={SHORT_TEXT}
              handleClick={() => null}
              disabled={false}
            />
            <ButtonView
              hierarchy={"primary"}
              size={"sm"}
              label={MEDIUM_TEXT}
              handleClick={() => null}
              disabled={false}
            />
            <ButtonView
              hierarchy={"primary"}
              size={"sm"}
              label={VERY_LONG_TEXT}
              handleClick={() => null}
              disabled={false}
            />
            <span>small disabled</span>
            <ButtonView
              hierarchy={"primary"}
              size={"sm"}
              label={EMPTY_TEXT}
              handleClick={() => null}
              disabled={true}
            />
            <ButtonView
              hierarchy={"primary"}
              size={"sm"}
              label={SHORT_TEXT}
              handleClick={() => null}
              disabled={true}
            />
            <ButtonView
              hierarchy={"primary"}
              size={"sm"}
              label={MEDIUM_TEXT}
              handleClick={() => null}
              disabled={true}
            />
            <ButtonView
              hierarchy={"primary"}
              size={"sm"}
              label={VERY_LONG_TEXT}
              handleClick={() => null}
              disabled={true}
            />
            <span>medium enabled</span>
            <ButtonView
              hierarchy={"primary"}
              size={"md"}
              label={EMPTY_TEXT}
              handleClick={() => null}
              disabled={false}
            />
            <ButtonView
              hierarchy={"primary"}
              size={"md"}
              label={SHORT_TEXT}
              handleClick={() => null}
              disabled={false}
            />
            <ButtonView
              hierarchy={"primary"}
              size={"md"}
              label={MEDIUM_TEXT}
              handleClick={() => null}
              disabled={false}
            />
            <ButtonView
              hierarchy={"primary"}
              size={"md"}
              label={VERY_LONG_TEXT}
              handleClick={() => null}
              disabled={false}
            />
            <span>medium disabled</span>
            <ButtonView
              hierarchy={"primary"}
              size={"md"}
              label={EMPTY_TEXT}
              handleClick={() => null}
              disabled={true}
            />
            <ButtonView
              hierarchy={"primary"}
              size={"md"}
              label={SHORT_TEXT}
              handleClick={() => null}
              disabled={true}
            />
            <ButtonView
              hierarchy={"primary"}
              size={"md"}
              label={MEDIUM_TEXT}
              handleClick={() => null}
              disabled={true}
            />
            <ButtonView
              hierarchy={"primary"}
              size={"md"}
              label={VERY_LONG_TEXT}
              handleClick={() => null}
              disabled={true}
            />
            <span>Large Enabled</span>
            <ButtonView
              hierarchy={"primary"}
              size={"md"}
              label={EMPTY_TEXT}
              handleClick={() => null}
              disabled={false}
            />
            <ButtonView
              hierarchy={"primary"}
              size={"md"}
              label={SHORT_TEXT}
              handleClick={() => null}
              disabled={false}
            />
            <ButtonView
              hierarchy={"primary"}
              size={"lg"}
              label={MEDIUM_TEXT}
              handleClick={() => null}
              disabled={false}
            />
            <ButtonView
              hierarchy={"primary"}
              size={"lg"}
              label={VERY_LONG_TEXT}
              handleClick={() => null}
              disabled={false}
            />
            <span>large disabled</span>
            <ButtonView
              hierarchy={"primary"}
              size={"lg"}
              label={EMPTY_TEXT}
              handleClick={() => null}
              disabled={true}
            />
            <ButtonView
              hierarchy={"primary"}
              size={"lg"}
              label={SHORT_TEXT}
              handleClick={() => null}
              disabled={true}
            />
            <ButtonView
              hierarchy={"primary"}
              size={"lg"}
              label={MEDIUM_TEXT}
              handleClick={() => null}
              disabled={true}
            />
            <ButtonView
              hierarchy={"primary"}
              size={"lg"}
              label={VERY_LONG_TEXT}
              handleClick={() => null}
              disabled={true}
            />
            <span>XL enabled</span>
            <ButtonView
              hierarchy={"primary"}
              size={"xl"}
              label={EMPTY_TEXT}
              handleClick={() => null}
              disabled={false}
            />
            <ButtonView
              hierarchy={"primary"}
              size={"xl"}
              label={SHORT_TEXT}
              handleClick={() => null}
              disabled={false}
            />
            <ButtonView
              hierarchy={"primary"}
              size={"xl"}
              label={MEDIUM_TEXT}
              handleClick={() => null}
              disabled={false}
            />
            <ButtonView
              hierarchy={"primary"}
              size={"xl"}
              label={VERY_LONG_TEXT}
              handleClick={() => null}
              disabled={false}
            />
            <span>XL disabled</span>
            <ButtonView
              hierarchy={"primary"}
              size={"xl"}
              label={EMPTY_TEXT}
              handleClick={() => null}
              disabled={true}
            />
            <ButtonView
              hierarchy={"primary"}
              size={"xl"}
              label={SHORT_TEXT}
              handleClick={() => null}
              disabled={true}
            />
            <ButtonView
              hierarchy={"primary"}
              size={"xl"}
              label={MEDIUM_TEXT}
              handleClick={() => null}
              disabled={true}
            />
            <ButtonView
              hierarchy={"primary"}
              size={"xl"}
              label={VERY_LONG_TEXT}
              handleClick={() => null}
              disabled={true}
            />
            <span>2xl enabled</span>
            <ButtonView
              hierarchy={"primary"}
              size={"2xl"}
              label={EMPTY_TEXT}
              handleClick={() => null}
              disabled={false}
            />
            <ButtonView
              hierarchy={"primary"}
              size={"2xl"}
              label={SHORT_TEXT}
              handleClick={() => null}
              disabled={false}
            />
            <ButtonView
              hierarchy={"primary"}
              size={"2xl"}
              label={MEDIUM_TEXT}
              handleClick={() => null}
              disabled={false}
            />
            <ButtonView
              hierarchy={"primary"}
              size={"2xl"}
              label={VERY_LONG_TEXT}
              handleClick={() => null}
              disabled={false}
            />
            <span>2xl disabled</span>
            <ButtonView
              hierarchy={"primary"}
              size={"2xl"}
              label={EMPTY_TEXT}
              handleClick={() => null}
              disabled={true}
            />
            <ButtonView
              hierarchy={"primary"}
              size={"2xl"}
              label={SHORT_TEXT}
              handleClick={() => null}
              disabled={true}
            />
            <ButtonView
              hierarchy={"primary"}
              size={"2xl"}
              label={MEDIUM_TEXT}
              handleClick={() => null}
              disabled={true}
            />
            <ButtonView
              hierarchy={"primary"}
              size={"2xl"}
              label={VERY_LONG_TEXT}
              handleClick={() => null}
              disabled={true}
            />
            <h2> Secondary </h2>
            <br />
            <span>Small enabled</span>
            <ButtonView
              hierarchy={"secondary"}
              size={"sm"}
              label={EMPTY_TEXT}
              handleClick={() => null}
              disabled={false}
            />
            <ButtonView
              hierarchy={"secondary"}
              size={"sm"}
              label={SHORT_TEXT}
              handleClick={() => null}
              disabled={false}
            />
            <ButtonView
              hierarchy={"secondary"}
              size={"sm"}
              label={MEDIUM_TEXT}
              handleClick={() => null}
              disabled={false}
            />
            <ButtonView
              hierarchy={"secondary"}
              size={"sm"}
              label={VERY_LONG_TEXT}
              handleClick={() => null}
              disabled={false}
            />
            <span>small disabled</span>
            <ButtonView
              hierarchy={"secondary"}
              size={"sm"}
              label={EMPTY_TEXT}
              handleClick={() => null}
              disabled={true}
            />
            <ButtonView
              hierarchy={"secondary"}
              size={"sm"}
              label={SHORT_TEXT}
              handleClick={() => null}
              disabled={true}
            />
            <ButtonView
              hierarchy={"secondary"}
              size={"sm"}
              label={MEDIUM_TEXT}
              handleClick={() => null}
              disabled={true}
            />
            <ButtonView
              hierarchy={"secondary"}
              size={"sm"}
              label={VERY_LONG_TEXT}
              handleClick={() => null}
              disabled={true}
            />
            <span>medium enabled</span>
            <ButtonView
              hierarchy={"secondary"}
              size={"md"}
              label={EMPTY_TEXT}
              handleClick={() => null}
              disabled={false}
            />
            <ButtonView
              hierarchy={"secondary"}
              size={"md"}
              label={SHORT_TEXT}
              handleClick={() => null}
              disabled={false}
            />
            <ButtonView
              hierarchy={"secondary"}
              size={"md"}
              label={MEDIUM_TEXT}
              handleClick={() => null}
              disabled={false}
            />
            <ButtonView
              hierarchy={"secondary"}
              size={"md"}
              label={VERY_LONG_TEXT}
              handleClick={() => null}
              disabled={false}
            />
            <span>medium disabled</span>
            <ButtonView
              hierarchy={"secondary"}
              size={"md"}
              label={EMPTY_TEXT}
              handleClick={() => null}
              disabled={true}
            />
            <ButtonView
              hierarchy={"secondary"}
              size={"md"}
              label={SHORT_TEXT}
              handleClick={() => null}
              disabled={true}
            />
            <ButtonView
              hierarchy={"secondary"}
              size={"md"}
              label={MEDIUM_TEXT}
              handleClick={() => null}
              disabled={true}
            />
            <ButtonView
              hierarchy={"secondary"}
              size={"md"}
              label={VERY_LONG_TEXT}
              handleClick={() => null}
              disabled={true}
            />
            <span>Large Enabled</span>
            <ButtonView
              hierarchy={"secondary"}
              size={"md"}
              label={EMPTY_TEXT}
              handleClick={() => null}
              disabled={false}
            />
            <ButtonView
              hierarchy={"secondary"}
              size={"md"}
              label={SHORT_TEXT}
              handleClick={() => null}
              disabled={false}
            />
            <ButtonView
              hierarchy={"secondary"}
              size={"lg"}
              label={MEDIUM_TEXT}
              handleClick={() => null}
              disabled={false}
            />
            <ButtonView
              hierarchy={"secondary"}
              size={"lg"}
              label={VERY_LONG_TEXT}
              handleClick={() => null}
              disabled={false}
            />
            <span>large disabled</span>
            <ButtonView
              hierarchy={"secondary"}
              size={"lg"}
              label={EMPTY_TEXT}
              handleClick={() => null}
              disabled={true}
            />
            <ButtonView
              hierarchy={"secondary"}
              size={"lg"}
              label={SHORT_TEXT}
              handleClick={() => null}
              disabled={true}
            />
            <ButtonView
              hierarchy={"secondary"}
              size={"lg"}
              label={MEDIUM_TEXT}
              handleClick={() => null}
              disabled={true}
            />
            <ButtonView
              hierarchy={"secondary"}
              size={"lg"}
              label={VERY_LONG_TEXT}
              handleClick={() => null}
              disabled={true}
            />
            <span>XL enabled</span>
            <ButtonView
              hierarchy={"secondary"}
              size={"xl"}
              label={EMPTY_TEXT}
              handleClick={() => null}
              disabled={false}
            />
            <ButtonView
              hierarchy={"secondary"}
              size={"xl"}
              label={SHORT_TEXT}
              handleClick={() => null}
              disabled={false}
            />
            <ButtonView
              hierarchy={"secondary"}
              size={"xl"}
              label={MEDIUM_TEXT}
              handleClick={() => null}
              disabled={false}
            />
            <ButtonView
              hierarchy={"secondary"}
              size={"xl"}
              label={VERY_LONG_TEXT}
              handleClick={() => null}
              disabled={false}
            />
            <span>XL disabled</span>
            <ButtonView
              hierarchy={"secondary"}
              size={"xl"}
              label={EMPTY_TEXT}
              handleClick={() => null}
              disabled={true}
            />
            <ButtonView
              hierarchy={"secondary"}
              size={"xl"}
              label={SHORT_TEXT}
              handleClick={() => null}
              disabled={true}
            />
            <ButtonView
              hierarchy={"secondary"}
              size={"xl"}
              label={MEDIUM_TEXT}
              handleClick={() => null}
              disabled={true}
            />
            <ButtonView
              hierarchy={"secondary"}
              size={"xl"}
              label={VERY_LONG_TEXT}
              handleClick={() => null}
              disabled={true}
            />
            <span>2xl enabled</span>
            <ButtonView
              hierarchy={"secondary"}
              size={"2xl"}
              label={EMPTY_TEXT}
              handleClick={() => null}
              disabled={false}
            />
            <ButtonView
              hierarchy={"secondary"}
              size={"2xl"}
              label={SHORT_TEXT}
              handleClick={() => null}
              disabled={false}
            />
            <ButtonView
              hierarchy={"secondary"}
              size={"2xl"}
              label={MEDIUM_TEXT}
              handleClick={() => null}
              disabled={false}
            />
            <ButtonView
              hierarchy={"secondary"}
              size={"2xl"}
              label={VERY_LONG_TEXT}
              handleClick={() => null}
              disabled={false}
            />
            <span>2xl disabled</span>
            <ButtonView
              hierarchy={"secondary"}
              size={"2xl"}
              label={EMPTY_TEXT}
              handleClick={() => null}
              disabled={true}
            />
            <ButtonView
              hierarchy={"secondary"}
              size={"2xl"}
              label={SHORT_TEXT}
              handleClick={() => null}
              disabled={true}
            />
            <ButtonView
              hierarchy={"secondary"}
              size={"2xl"}
              label={MEDIUM_TEXT}
              handleClick={() => null}
              disabled={true}
            />
            <ButtonView
              hierarchy={"secondary"}
              size={"2xl"}
              label={VERY_LONG_TEXT}
              handleClick={() => null}
              disabled={true}
            />
          </div>
        </Receiver>
      </ComponentSection>
    )
}


const Receiver = styled.div`
  height: 700px;
  width: 360px;
  border: 4px solid black;
  border-radius: 4px;
`;

const ComponentSection = styled.section`
  width: 100vw;
  display: flex;
  justify-content: center;
  margin-top: 6rem;
  margin-bottom: 6rem;
  padding: 6rem;
`;

const ComponentSectionHeader = styled.div`
  margin-right: 6rem;
  min-width: 20rem;
`;

const ComponentSectionTitle = styled.h1``;

const FigmaLink = styled.div``;