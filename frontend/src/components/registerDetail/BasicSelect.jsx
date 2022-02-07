// import React, { useState } from "react";
import styled from "styled-components";
import { theme } from "styled-tools";
import { Select } from "./SelectList";
// import Calendar from "react-calendar";

export default function BasicSelect(props) {
  const onChangeHandler = (e) => {
    const { value, name } = e.target;
    props.setInputs({
      ...props.inputs,
      [name]: value,
    });
  };
  return (
    <InputsWrapper>
      <InputWrapper>
        <Label>생년월일</Label>
        {/* <Calendar /> */}
        <Input name="birthday" type="text" placeholder="ex) 0000-00-00" onChange={onChangeHandler} />
      </InputWrapper>
      <InputWrapper>
        <Label>성별</Label>
        <Select selectWidth="17.4rem" name="gender" form="Gender" placeholder="성별" onChange={onChangeHandler}>
          <option value="male">남자</option>
          <option value="female">여자</option>
        </Select>
      </InputWrapper>
    </InputsWrapper>
  );
}

const InputWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const InputsWrapper = styled(InputWrapper)`
  justify-content: space-between;
  width: 63.4rem;
`;

const Label = styled.label`
  margin-right: 1.8rem;
  ${theme("fonts.textH2")}
  ${theme("neons.textNeonGold")}
`;

export const Input = styled.input`
  border: 0.1rem solid ${theme("colors.mainWhite")};
  width: 22rem;
  color: white;
  font-family: NotoSerif;
  ${theme("fonts.textP")}
  ${theme("neons.boxNeonGold")}
`;
