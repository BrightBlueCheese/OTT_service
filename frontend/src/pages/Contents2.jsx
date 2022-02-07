import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Chart } from "../components";
import { ChartWrap, LandingPage } from "./Contents";
import styled from "styled-components";

export default function Contents2() {
  const navigate = useNavigate();

  const [userData3, setUserData3] = useState([]);
  const fetchData3 = async () => {
    axios.post(`${process.env.REACT_APP_BASE_URL}/contents-analysis/3`).then((res) => setUserData3(res.data));
  };

  useEffect(() => {
    const userToken = window.localStorage.getItem("token");
    axios.defaults.headers.common["Authorization"] = `JWT ${userToken}`;
    fetchData3();
  }, []);

  return (
    <Wrapper>
      {userData3.map((chartData, idx) => {
        const mention = chartData.people.split("_")[1];
        const isGender = mention.includes("male") ? true : false;
        return (
          <ChartWrap key={idx}>
            <LandingPage>같은 {isGender ? "성별" : "나이대"}의 사람들</LandingPage>
            <Chart data={chartData.data} genreName={chartData.people} />
          </ChartWrap>
        );
      })}
      <Button isMini={false} onClick={() => navigate("/contents3")}>
        다음 차트
      </Button>
    </Wrapper>
  );
}

export const Wrapper = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 15rem 0;
`;
