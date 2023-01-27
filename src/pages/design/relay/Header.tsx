import styled from "styled-components";

const Container = styled.div`
  background-image: url("/gradients.png");
  background-size: 100% auto;
  background-repeat: no-repeat;
  justify-self: center;
  width: 100%;
  max-width: 1440px;
  height: 633px;
  margin-bottom: 12rem;
  z-index: 0;
  position: relative;
`;

const Headertxt = styled.div`
  display: flex;
  flex-direction: column;
  width: 1344px;
  height: 189px;
  z-index: 2;
  padding: 2.875rem;
`;

const RelayRobot = styled.div`
  background: linear-gradient(
    91.75deg,
    #a979e9 3.01%,
    #849dfd 21.58%,
    #73b9ff 40.14%,
    #85cff8 58.71%,
    #ade1f0 77.28%,
    #dbeff0 95.84%
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const RobotWrapper = styled.div`
  display: flex;
  font-style: normal;
  font-weight: 900;
  font-size: 86px;
  gap: 1.75rem;
`;

const RobotHead = styled.div``;

const Description = styled.div`
  color: #ffffff;
  font-style: normal;
  font-weight: 700;
  font-size: 48px;
  line-height: 65px;
  padding-top: 0.781rem;
`;

export const Header = () => {
  return (
    <Container>
      <Headertxt>
        <RobotWrapper>
          <RelayRobot>Relay Robot </RelayRobot>
          <RobotHead>🤖</RobotHead>
        </RobotWrapper>
        <Description>ChatGPT for Wallet Messaging</Description>
      </Headertxt>
    </Container>
  );
};
