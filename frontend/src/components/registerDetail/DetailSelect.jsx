import styled from "styled-components";
import { theme } from "styled-tools";
import { Select } from "./SelectList";

export default function DetailSelect(props) {
  const onChangeHandler = (e) => {
    const { value, name } = e.target;
    props.setInputs({
      ...props.inputs,
      [name]: value,
    });
  };
  return (
    <IdWrap>
      {props.data.map((datum) => (
        <StSelectWrapper key={datum.id}>
          <label>{datum.label}</label>
          <Select selectWidth="100%" name={datum.id} form={datum.id} onChange={onChangeHandler}>
            {datum.option_list.map((option) => (
              <option key={option.id} value={option.value}>
                {option.value}
              </option>
            ))}
          </Select>
        </StSelectWrapper>
      ))}
    </IdWrap>
  );
}

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
