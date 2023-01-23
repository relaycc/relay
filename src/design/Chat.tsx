import styled from 'styled-components';
import { receiverTheme } from '@/design/receiverTheme';
import { textSmallRegular } from '@/design/typography';
import { Time } from '@/design/Time';
import { PinIcon } from '@/design/PinIcon';
import { LensIcon } from '@/design/LensIcon';
import { ENSName } from '@/design/ENSName';
import { Avatar } from '@/components/Avatar';

const Root = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  height: 4.5rem;
  cursor: pointer;

  width: 100%;
  background: #ffffff;

  :hover {
    background-color: ${receiverTheme.colors.gray['200']};
  }
  :active {
    background-color: ${receiverTheme.colors.gray['300']};
  }
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 0;
  column-gap: 24px;

  min-width: 65%;
  max-width: 80%;
`;

const MsgDetails = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: flex-start;
  max-width: 70%;
`;

const NameAndIcons = styled.div`
  display: flex;
  height: 1.5rem;
  column-gap: 4px;
  max-width: 100%;
`;

const MessageDetails = styled.div`
  ${textSmallRegular};
  color: ${receiverTheme.colors.gray['400']};
`;

const StyledTime = styled.div`
  display: flex;
`;

export const Chat = ({
  ENSname,
  messageDetails,
  hasLoaded,
  isPinned,
  hasLENS,
  handleClick,
  handle,
}: {
  ENSname: string;
  messageDetails: Array<{ message: string; time: string }>;
  hasLoaded: boolean;
  isPinned: boolean;
  hasLENS: boolean;
  handleClick: () => void;
  handle: string;
}) => {
  return (
    <Root onClick={handleClick}>
      <Wrapper>
        <Avatar handle={handle} onClick={() => null} size="md" />
        <MsgDetails>
          <NameAndIcons>
            <ENSName
              size={'md'}
              monoFont={true}
              isLoading={!hasLoaded}
              ENSname={ENSname}
            />
            {hasLENS && <LensIcon isLoading={!hasLoaded} />}
            {isPinned && <PinIcon pinned={isPinned} hasLoaded={hasLoaded} />}
          </NameAndIcons>
          <MessageDetails>{messageDetails[0].message}</MessageDetails>
        </MsgDetails>
      </Wrapper>
      <StyledTime>
        <Time isLoading={!hasLoaded} time={messageDetails[0].time} />
      </StyledTime>
    </Root>
  );
};
