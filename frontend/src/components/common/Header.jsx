import { useLocation, useNavigate } from "react-router-dom";
import styled, { css } from "styled-components";
import { ifProp, theme } from "styled-tools";
import { CommonNav } from "..";
import { LogoMini } from "../../assets/icons";

const NAVS = {
  register: "회원가입",
  login: "로그인",
};

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const pathname = location.pathname.split("/")[1];

  const isCommon = pathname === "register" ? false : pathname === "login" ? false : true;
  const mainPath = isCommon ? "/main" : "/";

  const COMMONNAVS = [
    { id: 0, navText: "나의 콘텐츠 유형 분석 결과", navigate: () => navigate("contents") },
    { id: 1, navText: "소극장 들어가기", navigate: () => navigate("theater_list") },
  ];

  const handleLogout = () => {
    navigate("/");
  };
  return (
    <StWrapper isLanding={!pathname} isCommon={isCommon}>
      <LogoMini onClick={() => navigate(mainPath)} />
      {isCommon ? <CommonNav navList={COMMONNAVS} /> : <StListWrapper>{NAVS[pathname]}</StListWrapper>}
      <span id="logout" onClick={handleLogout}>
        로그아웃
      </span>
    </StWrapper>
  );
};

export default Header;

const StWrapper = styled.header`
  ${ifProp(
    { isLanding: true },
    css`
      display: none;
    `,
    css`
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding-right: 10rem;
      width: 100%;
      height: 8rem;
      ${theme("fonts.textH2")}
      ${theme("neons.textNeonGold")};

      & > span#logout {
        visibility: ${ifProp({ isCommon: true }, "visible", "hidden")};
      }
    `,
  )};

  & > span,
  svg {
    cursor: pointer;
  }
`;

export const StListWrapper = styled.nav`
  display: flex;
  justify-content: center;
`;
