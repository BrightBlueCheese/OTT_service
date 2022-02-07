/* eslint-disable no-unused-vars */
/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from "react";
import { client } from "../../libs";
import styled from "styled-components";
import { Poster } from "..";

export default function PosterList({ selectedList, onSelect }) {
  const [posterList, setPosterList] = useState([]);

  useEffect(() => {
    fetchPoster();
  }, []);

  const fetchPoster = async () => {
    const { data } = await client.get("/user/contents-list");
    setPosterList(data);
  };

  return (
    <Wrapper>
      {posterList &&
        posterList.map((poster) => (
          <Poster
            key={`poster-${poster.id}`}
            id={poster.id}
            title={poster.title}
            imgSrc={poster.img_link}
            onSelect={onSelect}
            selected={selectedList}
          />
        ))}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 95rem;
  row-gap: 5rem;
  column-gap: 4.5rem;
`;
