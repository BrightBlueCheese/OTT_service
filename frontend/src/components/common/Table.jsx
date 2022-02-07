import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { theme } from "styled-tools";

export default function Table({ tHeadList, tBodyList }) {
  const navigate = useNavigate();

  return (
    <StWrapper>
      <thead>
        <tr>
          {tHeadList.map((head, idx) => (
            <th key={`head-${idx}`}>{head}</th>
          ))}
        </tr>
      </thead>
      {tBodyList.map((body) => (
        <tbody
          key={`tbody-${body.id}`}
          onClick={() => navigate(`/theater/${body.id}`, { state: { theaterInfo: body } })}>
          <tr>
            <td>{body.published_date}</td>
            <td>{body.title}</td>
            <td>{body.theater_owner}</td>
            <td>
              {body.theater_genre1} / {body.theater_genre2}
            </td>
          </tr>
        </tbody>
      ))}
    </StWrapper>
  );
}

const StWrapper = styled.table`
  margin-top: 2rem;
  border: 0.1rem solid ${theme("colors.textNeonStructure")};
  width: 144rem;
  ${theme("fonts.textP")}

  & > thead {
    color: ${theme("colors.mainPoint")};
    ${theme("neons.textNeonGold")}
  }

  & > tbody,
  td {
    cursor: pointer;
    padding: 1.5rem;
    text-align: center;
    ${theme("neons.textNeonGold")}
  }

  & > tbody {
    border-radius: 1.5rem;

    &:hover {
      ${theme("neons.boxNeonGold")};
    }
  }
`;
