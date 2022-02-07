import styled from "styled-components";
import { theme } from "styled-tools";
import { Button, NoticeSection } from "../components";
import { useLocation, useNavigate } from "react-router-dom";
import { ticket01, ticket02, ticket03, ticket04, ticket05, ticket06, ticket07 } from "../assets/images";

export default function Theater() {
  const TICKET_LIST = [ticket01, ticket02, ticket03, ticket04, ticket05, ticket06, ticket07];

  const LINK_LIST = [
    "https://open.kakao.com/o/gwEshgTd",
    "https://open.kakao.com/o/glH9hgTd",
    "https://open.kakao.com/o/greFigTd",
    "https://open.kakao.com/o/gifbjgTd",
    "https://open.kakao.com/o/gvltjgTd",
    "https://open.kakao.com/o/gPxwpgTd",
    "https://open.kakao.com/o/gexQpgTd",
  ];

  const navigate = useNavigate();
  const { state } = useLocation();
  const theaterInfo = state.theaterInfo;
  const theaterId = theaterInfo.id;
  const ticket = TICKET_LIST[theaterId - 1];
  const LINK_PATH = LINK_LIST[theaterId - 1];

  const { title, introduce, notice } = theaterInfo;

  return (
    <Wrapper>
      <span>
        식스맨 비대면 소극장 <Title>{title}</Title>입니다.
        <br />
        아래 티켓을 누르면 오픈 카톡 링크로 이동합니다!
      </span>
      <a href={LINK_PATH}>
        <Image src={ticket} alt="ticket image" />
      </a>
      <NoticeSection theaterTitle={title} introData={introduce} noticeData={notice} />
      <Button isMini={true} onClick={() => navigate(-1)}>
        소극장 더 둘러보기
      </Button>
    </Wrapper>
  );
}

const Wrapper = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 12rem;
  padding-bottom: 50rem;
  ${theme("fonts.textH2")}
  ${theme("neons.textNeonGold")}

  & > span {
    text-align: center;
  }
`;

const Image = styled.img`
  margin: 3rem 0;
  border: 0.1rem solid ${theme("colors.mainBlack")};
  border-radius: 2rem;
  width: 120rem;
  height: 40rem;

  &:hover {
    border-color: ${theme("colors.mainPoint")};
    ${theme("neons.boxNeonGold")}
  }
`;

export const Title = styled.span`
  position: relative;
  color: ${theme("colors.mainPoint")};
  margin: 0 0.8em;

  &::before {
    position: absolute;
    content: '"';
    left: -0.5em;
  }

  &::after {
    position: absolute;
    content: '"';
    right: -0.5em;
  }
`;
