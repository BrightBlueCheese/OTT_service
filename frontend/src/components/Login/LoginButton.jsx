import styled from "styled-components";
import { ifProp, theme } from "styled-tools";

export default function Button({ isMini, children }) {
  return <StWrapper isMini={isMini}>{children}</StWrapper>;
}

const StWrapper = styled.button`
  border: 0.1rem solid ${theme("colors.mainWhite")};
  border-radius: 1.5rem;
  padding: ${ifProp({ isMini: true }, "0.8rem 2rem", "2.5rem 4rem")};
  background-color: ${theme("colors.textNeonStructure")};
  font-family: NotoSerif;
  ${theme("fonts.textP")}
  color: ${theme("colors.mainWhite")};

  &:hover {
    background-color: ${theme("colors.mainPoint")};
    color: ${theme("colors.mainBlack")};
    ${theme("neons.boxNeonGold")};
  }
`;
