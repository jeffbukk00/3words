import WriteBoardWritingCardHeader from "./WriteBoardWritingCardHeader";
import WriteBoardWritingCardForm from "./WriteBoardWritingCardForm";

const WriteBoardWritingCard = (props) => {
    const { id, word, text, draggableAttributes, droppableAttributes } = props;

    return (
        <article
            className="write-board-writing-card"
            id={id}
            {...draggableAttributes}
            {...droppableAttributes}
        >
            <WriteBoardWritingCardHeader word={word} />
            <WriteBoardWritingCardForm word={word} text={text} />
        </article>
    );
};

export default WriteBoardWritingCard;
