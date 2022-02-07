import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Chart } from "../components";
import { ChartWrap, LandingPage } from "./Contents";
import { Wrapper } from "./Contents2";

export default function Contents3() {
  const navigate = useNavigate();
  const [userData5, setUserData5] = useState([]);
  const fetchData5 = async (token) => {
    axios.defaults.headers.common["Authorization"] = `JWT ${token}`;
    axios.post(`${process.env.REACT_APP_BASE_URL}/contents-analysis/5`).then((res) => setUserData5(res.data));
  };
  useEffect(() => {
    const userToken = window.localStorage.getItem("token");
    fetchData5(userToken);
  }, []);

  return (
    <Wrapper>
      {userData5.map((chartData, idx) => (
        <ChartWrap key={idx}>
          <LandingPage>{chartData.review_genre}를 좋아하는 사람들</LandingPage>
          <Chart data={chartData.data} genreName={chartData.review_genre} />
        </ChartWrap>
      ))}
      <Button isMini={false} onClick={() => navigate("/main")}>
        메인으로 돌아가기
      </Button>
    </Wrapper>
  );
}
