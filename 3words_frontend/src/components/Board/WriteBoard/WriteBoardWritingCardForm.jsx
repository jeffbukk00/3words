import TextEditor from "../../Shared/UtilComponent/TextEditor/TextEditor";

const WriteBoardWritingCardForm = (props) => {
    const { word, text } = props;

    return (
        <section>
            <TextEditor word={word} text={text} />
        </section>
    );
};

export default WriteBoardWritingCardForm;
