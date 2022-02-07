import { useState, useEffect } from "react";
import styled from "styled-components";
import { theme } from "styled-tools";
import { useNavigate, useLocation } from "react-router-dom";
import Fade from "react-reveal/Fade";
import { Button, PosterList } from "../components";
import { client } from "../libs";

export default function RegisterStep3() {
  const navigate = useNavigate();
  const location = useLocation();
  const [inputs, setInputs] = useState("");
  const [selectedList, setSelectedList] = useState([]);

  useEffect(() => {
    setInputs(location.state.inputs);
  }, []);

  useEffect(() => {
    console.log(`inputs`, inputs);
  }, [inputs]);

  const handleSelect = (id) => {
    setSelectedList((current) => [...current, id]);
  };
  const handleSubmit = async () => {
    // 서버로 포스터 데이터 보내주기
    if (selectedList.length !== 8) {
      alert("콘텐츠는 8개를 선택해주세요!");
    } else {
      const res = await client.post("user/register", { ...inputs, prefer_ott_content_genres: selectedList });
      console.log(`res`, res);
      navigate("/register/done");
    }
  };

  return (
    <Wrapper>
      <Fade>
        <Intro>다음 중 가장 좋아하는 또는 재밌을 것 같은 영화 8가지를 선택해주세요!</Intro>
        <PosterList selectedList={selectedList} onSelect={handleSelect} inputs={inputs} setInputs={setInputs} />
        <Button isMini={false} onClick={handleSubmit}>
          회원가입
        </Button>
      </Fade>
    </Wrapper>
  );
}

const Wrapper = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10rem;
  padding-top: 12rem;
  padding-bottom: 50rem;
`;

const Intro = styled.span`
  text-align: center;
  ${theme("fonts.textH2")}
  ${theme("neons.textNeonGold")}
`;
