import styled from "styled-components";
import { StListWrapper } from "./Header";

export default function CommonNav({ navList }) {
  return (
    <StWrapper>
      {navList.map((nav) => (
        <span key={`nav-${nav.id}`} onClick={nav.navigate}>
          {nav.navText}
        </span>
      ))}
    </StWrapper>
  );
}

const StWrapper = styled(StListWrapper)`
  justify-content: space-between;
  width: 95rem;

  & > span {
    cursor: pointer;
  }
`;
