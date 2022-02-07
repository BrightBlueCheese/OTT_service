import { Title } from "../../pages/Theater";

export default function Notice({ title, isNotice, children }) {
  return (
    <section>
      <span>
        소극장 <Title>{title}</Title>의 {isNotice ? "공지사항" : "소개"}
      </span>
      {children}
    </section>
  );
}
