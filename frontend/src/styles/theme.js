const calcRem = (size) => `${size / 10}rem`;
const fontSizes = {
  textH1: calcRem(45),
  textH2: calcRem(30),
  textH3: calcRem(25),
  textP: calcRem(20),
  engTextP: calcRem(20),
};

const fonts = {
  textH1: `
    letter-spacing: 0.05em;
    line-height: 1;
    font-size: ${fontSizes.textH1};
  `,
  textH2: `
    letter-spacing: 0.05em;
    line-height: 1.5;
    font-size: ${fontSizes.textH2};
  `,
  textH3: `
    letter-spacing: 0.05em;
    line-height: 1;
    font-size: ${fontSizes.textH3};
  `,
  textP: `
    letter-spacing: 0.05em;
    line-height: 1.5;
    font-size: ${fontSizes.textP};
  `,
  engTextP: `
    font-family: RobotoSlab;
    letter-spacing: 0.05em;
    line-height: 1;
    font-size: ${fontSizes.engTextP};
  `,
};

const colors = {
  mainWhite: "#FDFDFD",
  mainBlack: "#030305",
  mainPoint: "#FCEC67",
  textBorder: "rgba(91, 91, 91, 0.42)",
  textNeonStructure: "#DBDBDB",
};

const neons = {
  textNeonGold: `
    text-shadow: 0px 0px 8px ${colors.mainPoint},0px 0px 8px ${colors.mainPoint};
  `,
  boxNeonGold: `
    box-shadow: 0px 0px 30px 3px ${colors.mainPoint};
  ;
  `,
};

const theme = {
  fonts,
  colors,
  neons,
};

export default theme;
