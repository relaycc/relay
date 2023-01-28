import styled from "styled-components";

const Container = styled.div`
  justify-self: center;
  width: 100%;
  max-width: 1440px;
  z-index: 0;
  position: relative;
`;

const Headertxt = styled.div`
  display: flex;
  flex-direction: column;
  width: 1344px;
  z-index: 2;
  padding: 1rem 0 0 2rem;
`;

const RelayRobot = styled.span`
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
        <Description>
          ChatGPT for <RelayRobot>Wallet Messaging</RelayRobot>
        </Description>
      </Headertxt>
    </Container>
  );
};
