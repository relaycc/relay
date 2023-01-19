import styled from "styled-components";
import { AddressHeader } from "@/lib/design/AddressHeader";
import { ButtonView } from "@/lib/design/ButtonView";
import DesignAddressHeader from "./DesignAddressHeader";
import DesignButtonView from "./DesignButtonView";
import DesignAboutIcon from './DesignAboutIcon'
import DesignAlertCircle from './DesignAlertCircle'
import DesignArrowUpCircle from './DesignArrowUpCircle'
import DesignBackIcon from "./DesignBackIcon";

const VERY_LONG_TEXT =
  "Very long text that will be truncated. This is the longest text of all time and I can't believe that it's overlfowing the container.";
const MEDIUM_TEXT = "Medium text that might be truncated.";
const SHORT_TEXT = "Short text";
const EMPTY_TEXT = "";

export default function Design() {
  return (
    <CenteredFlexColumn>
      <h1>Relay Design System</h1>
      <DesignAddressHeader />
      <DesignButtonView />
      <DesignAboutIcon />
      <DesignAlertCircle />
      <DesignArrowUpCircle />
      <DesignBackIcon />
    </CenteredFlexColumn>
  );
}

const CenteredFlexColumn = styled.div`
  padding: 6rem;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
