import React from "react";
import styled from "styled-components";
import { theme } from "styled-tools";
const StyledInput = styled.input`
  /* 공통 스타일 */
  width: 100%;
  outline: none;
  border: 0.1rem solid #ededed;
  box-sizing: border-box;
  margin-bottom: 5rem;
  /* 색상 */
  background: black;
  color: white;
  /* 크기 */
  height: 4rem;

  ${theme("fonts.textP")}
  ${theme("neons.boxNeonGold")};
`;

const LoginInput = function ({ type, name, placeholder, onChange, value }) {
  return <StyledInput type={type} name={name} placeholder={placeholder} onChange={onChange} value={value} />;
};

export default LoginInput;
