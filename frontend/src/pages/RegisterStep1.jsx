/* eslint-disable prettier/prettier */
import React, { useState } from "react";
import styled from "styled-components";
import { theme } from "styled-tools";
import StyledBox from "../components/Style/styledBox";
import StyledContainer from "../components/Style/styledContainer";
import RegisterInput from "../components/Register/RegisterInput";
import LimitOnLength from "../components/Register/LimitOnLength";

import { useNavigate } from "react-router-dom";
import Fade from "react-reveal/Fade";
import { Button } from "../components";

function Register() {
  const navigate = useNavigate();
  const [inputs, setInput] = useState({
    username: "",
    password: "",
    nickname: "",
    birthday: "",
    gender: "male",
    watch_time: 1,
    prefer_ott_content_genres: [],
  });
  const { username, password, nickname } = inputs;
  const [password2, setPassword1] = useState("");
  const [checkIdLength, setOverIdLength] = useState(false);
  const [checkPwLength, setOverPwLength] = useState(false);

  const isOverLength = (inputValueLength, maxLength) => {
    if (inputValueLength > maxLength) {
      return true;
    }
  };
  const onChangePass = (e) => {
    setPassword1(e.target.value);
  };
  const onChange = (e) => {
    const { value, name } = e.target;
    setInput({
      ...inputs,
      [name]: value,
    });
    // console.log(inputs);
    const isUserIdOverLength = isOverLength(inputs.username.length, 8);
    if (isUserIdOverLength) {
      setOverIdLength(true);
    }
    if (!isUserIdOverLength) {
      setOverIdLength(false);
    }
    if (isOverLength(inputs.password.length, 12)) {
      setOverPwLength(true);
      //패스워드와 아이디의 길이제한
    }
    if (!isOverLength(inputs.password.length, 12)) {
      setOverPwLength(false);
    }
  };

  const PwCheck = (e) => {
    e.preventDefault();
    if (checkIdLength && checkPwLength) {
      return;
    }
    if (password !== password2) {
      alert("비밀번호를 다시 확인해주세요.");
      return;
    }
    if (!username || !password || !nickname) {
      alert("필수 항목을 작성해주세요");
      return;
    }
    if (password === password2) {
      navigate("/register/step2", { state: { inputs: inputs } });
      return;
    }
  };
  return (
    <>
      <Fade>
        <Wrap>
          <p>반갑습니다!</p>
          <p>비대면 극장 식스맨을 찾아주셔서 감사합니다.</p>
          <p>회원가입 진행을 위해 아이디와 비밀번호, 닉네임을 설정해주시기 바랍니다.</p>
        </Wrap>
        <StyledContainer>
          <div>
            <StyledBox padding="18px, 16px" lineHeight="20px">
              <RegisterInput
                labelName="아이디"
                name="username"
                type="text"
                placeholder="아이디"
                onChange={onChange}
                value={username}
              />
              {checkIdLength && <LimitOnLength>아이디를 8자 이내로 입력해주세요</LimitOnLength>}
              <RegisterInput
                labelName="비밀번호"
                name="password"
                type="password"
                placeholder="비밀번호"
                onChange={onChange}
                value={password}
              />
              {checkPwLength && <LimitOnLength>비밀번호를 12자 이내로 입력해주세요</LimitOnLength>}
              <RegisterInput
                labelName="비밀번호 확인"
                name="password2"
                type="password"
                placeholder="비밀번호 확인"
                onChange={onChangePass}
                value={password2}
              />
              <RegisterInput
                labelName="닉네임"
                name="nickname"
                type="text"
                placeholder="닉네임"
                onChange={onChange}
                value={nickname}
              />
            </StyledBox>
            <ButtonWrap>
              <Button isMini={true} onClick={PwCheck}>
                다음으로(1/3)
              </Button>
            </ButtonWrap>
          </div>
        </StyledContainer>
      </Fade>
    </>
  );
}

export default Register;

const Wrap = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 30vh;
  ${theme("fonts.textH2")}
  ${theme("neons.textNeonGold")};
`;
const ButtonWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  ${theme("fonts.textH2")}
  ${theme("neons.textNeonGold")};
`;
