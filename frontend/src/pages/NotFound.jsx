import { Button } from "../components";

export default function NotFound() {
  const handleBtnClick = () => {
    // 버튼 클릭 시에 하고 싶은 일들을 여기에 정의
    console.log("clicked!");
  };

  return (
    <div>
      {/* 작은 버튼들 */}
      <Button isMini={true} onClick={handleBtnClick}>
        결정
      </Button>
      {/* 크거나 길쭉한 버튼들 */}
      <Button isMini={false} onClick={handleBtnClick}>
        식스맨 입장을 위한 준비가 완료되었어요!
      </Button>
    </div>
  );
}
