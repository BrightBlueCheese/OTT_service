import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { theme } from "styled-tools";
import { Table, Button } from "../components";
import { Input } from "../components/registerDetail/BasicSelect";
import { client } from "../libs";

const tHeadList = ["극장 개관일", "극장이름", "극장주인", "주요 관심 장르"];

export default function TheaterList() {
  const [inputValue, setInputValue] = useState("");
  const [tableList, setTableList] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchSearchResult(inputValue);
    setInputValue("");
  };

  const fetchSearchResult = async (keyword) => {
    const { data } = await client.get(`small-theater?search-keyword=${keyword}`);
    setTableList(data);
  };

  const fetchTheaterList = async () => {
    const { data } = await client.get("small-theater");
    console.log(`data`, data);
    setTableList(data);
  };

  useEffect(() => {
    fetchTheaterList();
  }, []);

  return (
    <Wrapper>
      <InputWrapper>
        <label>비슷한 취향을 가진 사람들을 찾아볼까요?</label>
        <form onSubmit={handleSubmit}>
          <SearchInput
            type="text"
            placeholder="영화 제목 또는 장르를 입력해보세요!"
            name="title"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
          <SearchButton>검색</SearchButton>
        </form>
      </InputWrapper>
      <TableWrapper>
        <span>전체 소극장 목록</span>
        <Table tHeadList={tHeadList} tBodyList={tableList} />
      </TableWrapper>
      <Button isMini={true}>소극장 생성하기</Button>
    </Wrapper>
  );
}

const Wrapper = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 10rem;
`;

const InputWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 5rem;
  width: 144rem;
  color: ${theme("colors.mainPoint")};
  ${theme("neons.textNeonGold")}
  ${theme("fonts.textH2")}

  & > form {
    display: flex;
    align-items: center;
  }
`;

const SearchInput = styled(Input)`
  margin-right: 2rem;
  padding: 1.5rem 2rem;
  width: 45rem;
  height: 6rem;
`;

const SearchButton = styled.button`
  display: flex;
  justify-content: center;
  padding: 1.5rem 2rem;
  width: 15rem;
  height: 6rem;
  border: 0.1rem solid ${theme("colors.mainWhite")};
  color: white;
  font-family: NotoSerif;
  ${theme("fonts.textP")}
  ${theme("neons.boxNeonGold")}
`;

const TableWrapper = styled.section`
  margin-bottom: 10rem;
  ${theme("neons.textNeonGold")}
  ${theme("fonts.textH2")}
`;
