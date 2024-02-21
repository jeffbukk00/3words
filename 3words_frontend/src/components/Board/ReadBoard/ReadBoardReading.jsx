import ReadBoardReadingCard from "./ReadBoardReadingCard";
import ReadBoardReadingFooter from "./ReadBoardReadingFooter";

const ReadBoardReading = (props) => {
    const { first, second, third } = props;
    return (
        <section className="read-board-reading">
            <ReadBoardReadingCard word={first.word} text={first.text} />
            <ReadBoardReadingCard word={second.word} text={second.text} />
            <ReadBoardReadingCard word={third.word} text={third.text} />
            <ReadBoardReadingFooter />
        </section>
    );
};

export default ReadBoardReading;
