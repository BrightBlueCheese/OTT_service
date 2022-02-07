import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { loginUser } from "../_actions/user_actions";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import LoginInput from "../components/Login/LoginInput";
import LoginButton from "../components/Login/LoginButton";
import StyledContainer from "../components/Style/styledContainer";
import { theme } from "styled-tools";

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({
    username: "",
    password: "",
  });
  const { username, password } = inputs;

  const onChange = (e) => {
    const { value, name } = e.target;
    setInputs({
      ...inputs,
      [name]: value,
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    let body = {
      username: username,
      password: password,
    };
    if (!username || !password) {
      alert("필수 항목을 작성하세요");
    } else {
      dispatch(loginUser(body)).then((data) => {
        console.log(data);
        if (data.payload.success) {
          window.localStorage.setItem("username", data.payload.username);
          window.localStorage.setItem("token", data.payload.token);
          navigate("/main");
        }
        if (!data.payload.success) {
          alert(data.payload.message);
        }
      });
    }
  };

  return (
    <StyledContainer>
      <div style={{ padding: "40rem 0" }}>
        <form onSubmit={onSubmit} style={{ textAlign: "center" }}>
          <LoginInput
            type="text"
            name="username"
            placeholder="아이디를 입력해주세요"
            onChange={onChange}
            value={username}
          />
          <LoginInput
            type="password"
            name="password"
            placeholder="비밀번호를 입력해주세요"
            onChange={onChange}
            value={password}
          />
          <LoginButton type="submit" isMini={true}>
            로그인
          </LoginButton>
        </form>
        <StyledDiv>
          <Link to="/register/step1">
            <StyledSpan>식스맨 극장에 처음이신가요? 회원가입</StyledSpan>
          </Link>
        </StyledDiv>
      </div>
    </StyledContainer>
  );
}

export default Login;

const StyledDiv = styled.div`
  text-align: center;
  margin-top: 2rem;
  font-weight: 500;
  font-size: 1.6rem;
  ${theme("neons.textNeonGold")};
`;

const StyledSpan = styled.span`
  color: white;
  font-weight: 300;
  margin-right: 1rem;
  letter-spacing: -0.05rem;
  ${theme("fonts.textP")}
`;
