import React from "react";
import styled from "styled-components";
import { theme } from "styled-tools";
const StyledButton = styled.button`
  /* 공통 스타일 */
  width: 8rem;
  outline: none;
  box-sizing: border-box;
  border-radius: 0.5rem;
  color: #fff;
  cursor: pointer;
  /* 색상 */
  background: #bbb;

  /* 크기 */
  height: 2.5rem;
  margin-bottom: 0.8rem;
  font-size: 1.3rem;
  line-height: 2.5rem;

  &:hover {
    background-color: ${theme("colors.mainPoint")};
    color: ${theme("colors.mainBlack")};
    ${theme("neons.boxNeonGold")};
  }
`;

const CheckIdButton = function ({ onClick, children }) {
  return (
    <div>
      <StyledButton onClick={onClick}>{children}</StyledButton>
    </div>
  );
};

export default CheckIdButton;
