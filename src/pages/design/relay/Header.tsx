import styled from "styled-components";

const Container = styled.div`
  background-image: url("/gradients.png");
  width: 1440px;
  height: 633px;
  z-index: 0;
`

const Headertxt = styled.div`
  display: flex;
  flex-direction: column;
  width: 1344px;
  height: 189px;
  z-index: 2;
  padding: 2.875rem;
`;

const RelayRobot = styled.div`
  background: linear-gradient(91.75deg, #A979E9 3.01%, #849DFD 21.58%, #73B9FF 40.14%, #85CFF8 58.71%, #ADE1F0 77.28%, #DBEFF0 95.84%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  
`;

const RobotWrapper = styled.div`
  display: flex;
  font-style: normal;
  font-weight: 900;
  font-size: 86px;
  gap: 1.75rem
`;

const RobotHead = styled.div`
`;

const Description = styled.div`
  color: #FFFFFF;
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
