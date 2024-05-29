import ReadBoardReadingCardHeader from "./ReadBoardReadingCardHeader";
import ReadBoardReadingCardContent from "./ReadBoardReadingCardContent";

const ReadBoardReadingCard = (props) => {
    const { word, text } = props;

    return (
        <article className="read-board-reading-card">
            <ReadBoardReadingCardHeader word={word} />
            <ReadBoardReadingCardContent text={text} />
        </article>
    );
};

export default ReadBoardReadingCard;
