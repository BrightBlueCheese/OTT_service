import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";
import { theme } from "styled-tools";

export const GlobalStyle = createGlobalStyle`
  ${reset}

  * {
    box-sizing: border-box;
  }

  @font-face {
    font-family: "NotoSerif";
    font-weight: normal;
    font-style: normal;
    src: url("/fonts/NotoSerifKR-Regular.otf") format("opentype");
  }

  @font-face {
    font-family: "RobotoSlab";
    font-weight: normal;
    font-style: normal;
    src: url("/fonts/RobotoSlab-Regular.ttf") format("truetype");
  }

  html {
    background-color: ${theme("colors.mainBlack")};
    color: ${theme("colors.mainWhite")};
    font-family: NotoSerif;
    font-size: 7px;
  }

  a {
    text-decoration: none;
    color: inherit;
  }

  input, button {
    outline: none; 
    border: none;
    background-color: transparent;                                                                                                                                                                        
  }

  button {
    cursor: pointer;
    display: flex;
    align-items: center;
    background-color: transparent;
  }

  table {
    border-collapse: separate;
    border-spacing: 2rem;
  }
`;

export default GlobalStyle;
