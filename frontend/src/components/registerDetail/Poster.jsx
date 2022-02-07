import { useState } from "react";
import styled, { css } from "styled-components";
import { theme } from "styled-tools";

export default function Poster({ id, title, imgSrc, onSelect, selected }) {
  const [isClicked, setIsClicked] = useState(false);

  const handleClick = (id) => {
    if (selected.length < 8) {
      setIsClicked(!isClicked);
      onSelect(id);
    } else {
      alert("8개까지만 선택하실 수 있습니다");
    }
  };

  return (
    <Wrapper isClicked={isClicked} onClick={() => handleClick(id)}>
      <Title>{title}</Title>
      <StPoster src={imgSrc} alt="poster01" />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 20rem;
  height: 33.5rem;
  ${theme("fonts.textP")}
  ${theme("neons.textNeonGold")}
  ${(props) =>
    props.isClicked
      ? css`
          color: ${theme("colors.mainPoint")};
          & > img {
            border-color: ${theme("colors.mainPoint")};
            ${theme("neons.boxNeonGold")}
          }
        `
      : css`
          &:hover {
            color: ${theme("colors.mainPoint")};

            & > img {
              border-color: ${theme("colors.mainPoint")};
              ${theme("neons.boxNeonGold")}
            }
          }
        `}
`;

const Title = styled.span`
  margin-bottom: 1.5rem;
  width: 100%;
  text-align: center;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

const StPoster = styled.img`
  border: 0.1rem solid ${theme("colors.mainBlack")};
  width: 20rem;
  height: 30rem;
`;
