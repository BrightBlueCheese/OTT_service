import React from "react";
import styled from "styled-components";
import { theme } from "styled-tools";
const MenuBox = styled.ul`
  width: 50rem;
  margin: 0.8rem 0rem;
  margin-bottom: 1.2rem;
  border-radius: 1rem;
  box-sizing: border-box;
  ${theme("fonts.textH3")}
  ${theme("neons.textNeonGold")}
`;

function StyledBox({ children, padding, lineHeight, backColor }) {
  return (
    <MenuBox backColor={backColor} padding={padding} lineHeight={lineHeight}>
      {children}
    </MenuBox>
  );
}

export default StyledBox;
