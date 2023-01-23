import styled from 'styled-components';
import { Compose } from '@/design/Compose';
import { receiverTheme } from '@/design/receiverTheme';
import { displayXsBold } from '@/design/typography';
import { Avatar } from '@/components/Avatar';
import { useCallback } from 'react';
import { useRouter } from 'next/router';

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.5rem 1rem;
  height: 5.5rem;
  border-bottom: 1px solid ${receiverTheme.colors.gray['200']};
  background-color: #ffffff;

  width: 100%;
`;

const Title = styled.div`
  ${displayXsBold};
  color: ${receiverTheme.colors.gray['900']};
`;

const IconContainer = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  column-gap: 0.75rem;
`;

export const HomeHeader = ({ handle }: { handle: string }) => {
  const router = useRouter();
  const navigateToProfile = useCallback(() => {
    router.push(`/receiver/profile`);
  }, []);

  return (
    <Container>
      <Title>Messages</Title>
      <IconContainer>
        <Avatar handle={handle} onClick={navigateToProfile} size="sm" />
        <Compose />
      </IconContainer>
    </Container>
  );
};
