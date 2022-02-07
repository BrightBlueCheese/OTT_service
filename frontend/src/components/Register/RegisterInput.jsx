/* eslint-disable prettier/prettier */
import React from "react";
import styled from "styled-components";
import { theme } from "styled-tools";
const StyledLabel = styled.label`
  color: white;
`;
const StyledInput = styled.input`
  /* 공통 스타일 */
  width: 100%;
  outline: none;
  border: 0.1rem solid #ededed;
  box-sizing: border-box;
  color: #333;
  margin-top: 1rem;

  /* 색상 */
  background: black;
  color: white;

  /* 크기 */
  height: 4rem;
  margin-bottom: 5rem;
  ${theme("fonts.textH4")}
  ${theme("neons.boxNeonGold")}
`;

const RegisterInput = function ({ labelName, name, type, placeholder, onChange, value }) {
  return (
    <>
      <StyledLabel>{labelName}</StyledLabel>
      <StyledInput name={name} type={type} placeholder={placeholder} onChange={onChange} value={value} />
    </>
  );
};

export default RegisterInput;
