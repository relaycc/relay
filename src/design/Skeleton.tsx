import styled, { css } from 'styled-components';

export const loadingGradient = css`
  background: linear-gradient(
    90deg,
    #f1efef -24.18%,
    #f9f8f8 50.26%,
    #e7e5e5 114.84%
  );
  border-radius: 6px;
  height: 100%;
  width: 100%;
`;

export const LoadingCircle = styled.div`
  ${loadingGradient};
  height: 40px;
  width: 40px;
  min-width: 40px;
  border-radius: 100%;
`;

export const LoadingTitle = styled.div`
  ${loadingGradient};
  height: 1rem;
  width: 96px;
`;

export const LoadingSubtitle = styled.div`
  ${loadingGradient};
  height: 1rem;
  width: 231px;
`;

export const LoadingRoot = styled.div`
  display: flex;
  height: 4.5rem;
  padding: 1rem;
`;

export const LoadingRootDirect = styled(LoadingRoot)`
  align-self: flex-start;
`;

export const LoadingRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

export const LoadingColumn = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-left: 1.5rem;
`;

export const LoadingTime = styled.div`
  ${loadingGradient};
  height: 0.75rem;
  align-self: center;
  width: 54px;
  margin-left: 1rem;
`;

const Loading = () => (
  <LoadingRoot>
    <LoadingCircle />
    <LoadingColumn>
      <LoadingTitle />
      <LoadingSubtitle />
    </LoadingColumn>
    <LoadingTime />
  </LoadingRoot>
);
