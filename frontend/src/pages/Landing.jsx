import styled from "styled-components";
import { theme } from "styled-tools";
import { logo, footer } from "../assets/images";
import { Link } from "react-router-dom";
export default function Landing() {
  return (
    <Wrap>
      <LandingPage>
        <img src={logo} />
        <p>코로나로 지친 당신을 위한 비대면 극장 식스맨입니다.</p>
      </LandingPage>
      <ButtonWrapper>
        <Link to="/login">
          <LandingButton>로그인</LandingButton>
        </Link>
        <Link to="/register/step1">
          <LandingButton>회원가입</LandingButton>
        </Link>
      </ButtonWrapper>
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
  margin-bottom: 4rem;
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 10rem;
  width: 87rem;
  ${theme("fonts.textH2")}
  ${theme("neons.textNeonGold")};
`;

const LandingButton = styled.span`
  cursor: pointer;
  border-bottom: 0.1rem solid ${theme("colors.mainBlack")};
  padding: 2rem 3.5rem;
  color: ${theme("colors.mainWhite")};
  ${theme("neons.textNeonGold")}

  &:hover {
    color: ${theme("colors.mainPoint")};
    border-color: ${theme("colors.mainPoint")};
  }
`;
