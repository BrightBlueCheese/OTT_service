import React, { useState, useEffect } from "react";
import { Button, SelectList } from "../components";
import styled from "styled-components";
import { theme } from "styled-tools";
import { useLocation, useNavigate } from "react-router-dom";
import Fade from "react-reveal/Fade";
// import { useDispatch } from "react-redux";
// import { registerUser } from "../_actions/user_actions";
const TEMP_SELECTION_DATA = [
  {
    id: "watch_time",
    label: "주로 어떤 시간대에 영상을 시청하시나요??",
    option_list: [
      { id: "이용하지 않음", value: 0 },
      { id: "6:00 ~ 8:59", value: 1 },
      { id: "9:00 ~ 11:59", value: 2 },
      { id: "12:00 ~ 14:59", value: 3 },
      { id: "15:00 ~ 17:59", value: 4 },
      { id: "18:00 ~ 20:59", value: 5 },
      { id: "21:00 ~ 23:59", value: 6 },
      { id: "24:00 ~ 5:59", value: 7 },
    ],
  },
];

export default function RegisterStep() {
  const navigate = useNavigate();
  const location = useLocation();
  // const dispatch = useDispatch();
  const [inputs, setInputs] = useState("");

  const { username, password, nickname, birthday, gender, watch_time } = inputs;
  //
  // console.log(inputs);
  useEffect(() => {
    setInputs(location.state.inputs);
  }, []);

  const SignUp = (e) => {
    e.preventDefault();
    const body = {
      username: username,
      password: password,
      nickname: nickname,
      birthday: birthday,
      gender: gender,
      watch_time: watch_time,
    };
    console.log(body);
    if (!birthday || !gender || !watch_time) {
      alert("작성되지 않은 항목이 있습니다.");
      return;
    }
    navigate("/register/step3", { state: { inputs: inputs } });
    // dispatch(registerUser(body))
    //   .then((data) => {
    //     const isSuccess = data.payload.success;
    //     console.log(data);
    //     if (isSuccess) {
    //       navigate("./register/step3");
    //     }
    //     if (!isSuccess) {
    //       alert("회원가입에 실패했습니다.");
    //     }
    //   })
    //   .catch((error) => console.log(error));
  };

  return (
    <Wrapper>
      <Fade>
        <Intro>
          {nickname}님에게 꼭 맞는 비대면 극장을 추천해드릴게요!
          <br />
          기본적인 정보만을 수집하고, 분석 이외의 목적으로는 절대 사용되지 않습니다.
        </Intro>
        <SelectList data={TEMP_SELECTION_DATA} inputs={inputs} setInputs={setInputs} />
        <Button isMini={true} onClick={SignUp}>
          다음으로(2/3)
        </Button>
      </Fade>
    </Wrapper>
  );
}

const Wrapper = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10rem;
  padding-top: 12rem;
  padding-bottom: 50rem;
`;

const Intro = styled.span`
  text-align: center;
  ${theme("fonts.textH2")}
  ${theme("neons.textNeonGold")}
`;
