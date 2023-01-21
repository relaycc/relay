import styled from "styled-components";
import DesignAddressHeader from "./DesignAddressHeader";
import DesignButtonView from "./DesignButtonView";
import DesignAboutIcon from './DesignAboutIcon'
import DesignAlertCircle from './DesignAlertCircle'
import DesignArrowUpCircle from './DesignArrowUpCircle'
import DesignBackIcon from "./DesignBackIcon";
import DesignBadge from "./DesignBadge";
import DesignChatIcon from './DesignChatIcon'
import DesignCheckbox from "./DesignCheckbox";
import DesignCloseIcon from "./DesignCloseIcon";
import DesignCompose from "./DesignCompose";
import DesignCopy from "./DesignCopy";
import DesignDropdownIcon from "./DesignDropdownIcon"; 
import DesignEdit from "./DesignEdit";
import DesignENSID from "./DesignENSID";
import DesignENSName from './DesignENSName'
import DesignHomeHeader from "./DesignHomeHeader";
import DesignIgnoredMessage from "./DesignIgnoredMessage";
import DesignInfoToast from "./DesignInfoToast";
import DesignInfoToastIcon from "./DesignInfoToastIcon";
import DesignInitializeXmtp from "./DesignInitializeXmtp";
import DesignLensIcon from "./DesignLensIcon";
import DesignLinkIcon from "./DesignLinkIcon";
import DesignLoaderAnimGeneral from "./DesignLoaderAnimGeneral";
import DesignLoaderAniminitialization from "./DesignLoaderAniminitialization";
import DesignLogo from "./DesignLogo";
import DesignLogoPicture from "./DesignLogoPicture";
import DesignLogoutIcon from "./DesignLogoutIcon";
import DesignMagnifier from "./DesignMagnifier";
import DesignMsgBox from "./DesignMsgBox";
import DesignMsgBundleReceived from "./DesignMsgBundlesReceived";
import DesignMsgBundleSent from "./DesignMsgBundleSent";
import DesignMsgPreview from "./DesignMsgPreview";
import DesignNav from "./DesignNav";
import DesignNewDateDivider from "./DesignNewDateDivider";
import DesignNewMessageHeader from "./DesignNewMessageHeader";
import DesignNewMsgInput from "./DesignNewMessageInput";
import DesignNewUserMessage from "./DesignNewUserMessage";
import DesignPinButton from "./DesignPinButton";


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
      <DesignBadge />
      <DesignChatIcon />
      <DesignCheckbox />
      <DesignCloseIcon />
      <DesignCompose />
      <DesignCopy />
      <DesignDropdownIcon />
      <DesignEdit />
      <DesignENSID />
      <DesignENSName />
      <DesignHomeHeader />
      <DesignIgnoredMessage />
      <DesignInfoToast />
      <DesignInfoToastIcon />
      <DesignInitializeXmtp />
      <DesignLensIcon />
      <DesignLinkIcon />
      <DesignLoaderAnimGeneral />
      <DesignLoaderAniminitialization />
      <DesignLogo />
      <DesignLogoPicture />
      <DesignLogoutIcon />
      <DesignMagnifier />
      <DesignMsgBox />
      <DesignMsgBundleReceived />
      <DesignMsgBundleSent />
      <DesignMsgPreview />
      <DesignNav />
      <DesignNewDateDivider />
      <DesignNewMessageHeader />
      <DesignNewMsgInput />
      <DesignNewUserMessage />
      <DesignPinButton />
    </CenteredFlexColumn>
  );
}

const CenteredFlexColumn = styled.div`
  padding: 6rem;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
