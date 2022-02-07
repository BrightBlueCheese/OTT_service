/* eslint-disable prettier/prettier */
import styled from "styled-components";
import { theme } from "styled-tools";
import * as images from "../assets/images";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Button } from "../components";

export default function Contents() {
  const navigate = useNavigate();
  const [userData1, setUserData1] = useState([]);
  const [age, setAge] = useState("");

  const fetchData1 = async () => {
    axios.post(`${process.env.REACT_APP_BASE_URL}/contents-analysis/1`).then((res) => setUserData1(res.data.data));
  };

  useEffect(() => {
    const userToken = window.localStorage.getItem("token");
    axios.defaults.headers.common["Authorization"] = `JWT ${userToken}`;
    fetchData1(userToken);
  }, []);

  useEffect(() => {
    setAge(userData1?.age?.split("_")[1].split("s")[0]);
  }, [userData1]);

  return (
    <Wrap>
      {age && userData1 && (
        <LandingPage>
          {userData1.username}님은 {age}대 {userData1.gender}이시고, {userData1.watch_time}대에 주로 콘텐츠를
          시청하시는군요!
          <br />
          주로 {userData1.user_genres?.join(", ")} 콘텐츠를 좋아하시는군요!
        </LandingPage>
      )}

      <LandingPage>사용자님과 같은 나이대 분들이 시청하는 시간대입니다.</LandingPage>
      <WrapImg>
        <Image src={images[`age${age}_2019`]} alt="age image" />
        <Image src={images[`age${age}_2020`]} alt="age image" />
        <br />
      </WrapImg>
      <LandingPage>넷플릭스에서 서비스 중인 장르들</LandingPage>
      <WrapWord>
        <Image src={images.word} alt="word image" />
      </WrapWord>

      <LandingPage>한국 넷플릭스의 장르변화 2019-2020</LandingPage>
      <WrapNetflix>
        <Image src={images.netflix} alt="netflix image" />
      </WrapNetflix>
      <Button isMini={false} onClick={() => navigate("/contents2")}>
        다음 차트
      </Button>
    </Wrap>
  );
}
// background-image: url(${footer});
const Wrap = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10rem;
  padding: 15rem 0;

  ${theme("fonts.textH2")}
  ${theme("neons.textNeonGold")};

  & > img {
    width: 38rem;
    height: 19rem;
  }
`;

export const ChartWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 10rem auto;

  width: 50vw;
  height: 40vh;
  ${theme("fonts.textH2")}
  /* ${theme("neons.textNeonGold")}; */
  color: ${theme("colors.mainPoint")};

  & > img {
    width: 38rem;
    height: 19rem;
  }
`;

export const LandingPage = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  margin-top: 5rem;
`;
const Image = styled.img`
  margin: 3rem 0;
  border: 0.1rem solid ${theme("colors.mainBlack")};
  border-radius: 2rem;
`;

const WrapImg = styled.div`
  display: flex;
  // flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 10rem auto;

  width: 50vw;
  height: 40vh;

  & > img {
    width: 90rem;
    height: 60rem;
  }
`;

const WrapWord = styled.div`
  display: flex;
  // flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 1rem auto;

  width: 50vw;
  height: 40vh;
  ${theme("fonts.textH2")}
  ${theme("neons.textNeonGold")};

  & > img {
    width: 70rem;
    height: 50rem;
  }
`;

const WrapNetflix = styled.div`
  display: flex;
  // flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 10rem auto;

  width: 50vw;
  height: 40vh;
  ${theme("fonts.textH2")}
  ${theme("neons.textNeonGold")};

  & > img {
    width: 130rem;
    height: 60rem;
  }
`;
