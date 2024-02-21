const WriteBoardWritingCardHeader = (props) => {
    const { word } = props;

    return (
        <header className="write-board-card-header">
            <h3>{word}</h3>
        </header>
    );
};

export default WriteBoardWritingCardHeader;
