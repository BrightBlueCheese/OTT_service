import React from "react";
import styled from "styled-components";
import { theme } from "styled-tools";
const StyledButton = styled.button`
  /* 공통 스타일 */
  width: 100%;
  color: white;
  cursor: pointer;
  text-align: center;
  border-radius: 1.2rem;

  /* 크기 */
  height: 4rem;
  font-weight: 200;

  /* 색상 */
  background: black;
  margin-top: 2rem;
  margin-bottom: 0.8rem;
  ${theme("fonts.textH3")}
  ${theme("neons.textNeonGold")}
  &:hover {
    background-color: ${theme("colors.mainPoint")};
    color: ${theme("colors.mainBlack")};
    ${theme("neons.boxNeonGold")};
  }
`;

const RegisterButton = function ({ type, children, onClick }) {
  return (
    <StyledButton type={type} onClick={onClick}>
      {children}
    </StyledButton>
  );
};

export default RegisterButton;
