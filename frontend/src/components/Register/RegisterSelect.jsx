import React from "react";
import styled from "styled-components";

const StyledLabel = styled.label`
  font-size: 1.2rem;
  color: #777;
  padding-left: 0.5rem;
`;
const StyledSelect = styled.select`
  /* 공통 스타일 */
  width: 100%;
  outline: none;
  border: 0.1rem solid #ededed;
  border-radius: 1.2rem;
  box-sizing: border-box;
  color: #333;
  padding-left: 0.5rem;
  padding-right: 0.5rem;

  /* 색상 */
  background: #f9f9f9;
  cd &:focus {
    background: #fff;
  }

  /* 크기 */
  height: 4rem;
  margin-top: 0.4rem;
  margin-bottom: 0.8rem;
`;

function RegisterSelect({ labelName, handleOption, option, dataArr }) {
  return (
    <StyledLabel>
      {labelName}
      <StyledSelect onChange={handleOption} value={option}>
        {dataArr.map((data, index) => {
          return (
            <option value={data} key={index}>
              {data}
            </option>
          );
        })}
      </StyledSelect>
    </StyledLabel>
  );
}

export default RegisterSelect;
