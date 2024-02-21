const ReadBoardReadingHeader = (props) => {
    const { word } = props;

    return (
        <header className="read-board-card-header">
            <h3>{word}</h3>
        </header>
    );
};

export default ReadBoardReadingHeader;
