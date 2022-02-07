import styled from "styled-components";
import { theme } from "styled-tools";
import { logo, footer } from "../assets/images";
export default function Main() {
  return (
    <Wrap>
      <LandingPage>
        <img src={logo} />
        <p>코로나로 지친 당신을 위한 비대면 극장 식스맨입니다.</p>
      </LandingPage>
    </Wrap>
  );
}
const Wrap = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-image: url(${footer});
  background-repeat: no-repeat;
  background-position: bottom;
  width: 100vw;
  height: 100vh;
  ${theme("fonts.textH2")}
  ${theme("neons.textNeonGold")};

  & > img {
    width: 38rem;
    height: 19rem;
  }
`;

const LandingPage = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 33rem;
  height: 33rem;
`;
