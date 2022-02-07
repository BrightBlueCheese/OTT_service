import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { theme } from "styled-tools";
import { Button } from "../components";

export default function RegisterDone() {
  const navigate = useNavigate();
  const location = useLocation();
  console.log(`location`, location);

  return (
    <Wrap>
      <StIntro>
        식스맨 비대면 극장에 오신것을 환영합니다!
        <br />
        코로나19로 지친 님에게 좋은 위로가 될 수 있기를 바랍니다.
      </StIntro>
      <Button isMini={false} onClick={() => navigate("/login")}>
        로그인 하고 식스맨 비대면 극장 둘러보기
      </Button>
    </Wrap>
  );
}

const Wrap = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: calc(100vh - 8rem);
`;

const StIntro = styled.p`
  margin-bottom: 6rem;
  text-align: center;
  ${theme("fonts.textH2")}
  ${theme("neons.textNeonGold")}
`;
