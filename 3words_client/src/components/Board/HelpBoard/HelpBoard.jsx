const HelpBoard = (props) => {
  return (
    <main className="help-board">
      <header className="help-board-header">
        <h2>3 Words, 3단어로 하는 상상</h2>
        <p>
          3 Words는 3개의 단어로부터 시작 된 상상을 글로 적어 공유하는
          서비스입니다.
        </p>
      </header>
      <div className="help-board-body">
        <div>
          <p>사람들의 생각은 다양합니다.</p>
          <p>
            같은 단어를 보고도 각자가 하는 상상은 정말이지 다를 수 있습니다.
          </p>
          <p>다양한 상상은 때로는 풍요로운 이야기를 낳기도 합니다.</p>
        </div>
        <div>
          <p>
            요즘, 자극적인 콘텐츠에 둘러싸여 기본적인 상상력이 마비되는 경험을
            하곤 합니다.
          </p>
          <p>
            그 결과로, 항상 같은 내용의 콘텐츠만 찾게 되며 이는 앞서 말한 상상과
            이야기의 풍요로움을 빼앗아 갑니다.
          </p>
        </div>
        <div>
          <p>
            이에 대한 경계심을 가지고, 3 words는 가장 쉬운 형태의 상상을
            해보고자 합니다.
          </p>
          <p>
            그리고 단어들을 미리 정해 놓아 같은 상상의 출발점을 가지므로,
            추상적일 수 있는 상상의 장을 보다 구체적으로 만들어 줍니다.
          </p>
        </div>
      </div>
    </main>
  );
};

export default HelpBoard;
