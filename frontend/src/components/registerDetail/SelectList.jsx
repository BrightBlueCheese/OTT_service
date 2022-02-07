/* eslint-disable no-unused-vars */
import React from "react";
import styled from "styled-components";
import { theme } from "styled-tools";
import { BasicSelect } from "..";

export default function SelectList(props) {
  // console.log(props.inputs);
  const onChangeHandler = (e) => {
    const { value, name } = e.target;
    props.setInputs({
      ...props.inputs,
      [name]: value,
    });
  };
  return (
    <StWrapper>
      <BasicSelect inputs={props.inputs} setInputs={props.setInputs} />
      <IdWrap>
        {props.data.map((datum) => (
          <StSelectWrapper key={datum.id}>
            <label>{datum.label}</label>
            <Select selectWidth="100%" name={datum.id} form={datum.id} onChange={onChangeHandler}>
              {datum.option_list.map((option) => (
                <option key={option.id} value={option.value}>
                  {option.id}
                </option>
              ))}
            </Select>
          </StSelectWrapper>
        ))}
      </IdWrap>
    </StWrapper>
  );
}
const StWrapper = styled.section`
  display: flex;
  flex-direction: column;
`;

export const Select = styled.select`
  border: 0.1rem solid ${theme("colors.mainWhite")};
  background-color: black;
  width: ${({ selectWidth }) => selectWidth};
  height: 4rem;
  color: white;
  font-family: NotoSerif;
  ${theme("fonts.textP")}
  ${theme("neons.boxNeonGold")}
`;
const IdWrap = styled.div`
  margin-bottom: 5rem;
  width: 63.4rem;
  ${theme("fonts.textH3")}
  ${theme("neons.textNeonGold")};
`;

const StSelectWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 7.5rem;

  & > label {
    margin-bottom: 2rem;
  }
`;
