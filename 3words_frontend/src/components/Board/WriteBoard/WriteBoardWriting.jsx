import { useContext } from "react";

import useDragAndDrop from "../../../hook/useDragAndDrop";
import AuthContext from "../../../store/AuthContext";

import WriteBoardWritingCard from "./WriteBoardWritingCard";
import WriteBoardWritingFooter from "./WritingBoardWritingFooter";

import NavBackBar from "../../Shared/UI/NavBackBar";

const WriteBoardWriting = (props) => {
    const { wordsProposalId, pageCloseHandler } = props;

    const { token } = useContext(AuthContext);

    const {
        writing: { first, second, third, opened },
        setWriting,
        isLoading,
        setIsLoading,
        draggableAttributes,
        droppableAttributes,
    } = useDragAndDrop(wordsProposalId);

    const saveWritingHandler = async () => {
        setIsLoading(true);
        const firstText = document.getElementById(
            `text-editor-${first.word}`
        ).innerHTML;
        const secondText = document.getElementById(
            `text-editor-${second.word}`
        ).innerHTML;
        const thirdText = document.getElementById(
            `text-editor-${third.word}`
        ).innerHTML;

        const body = {
            first: { word: first.word, text: firstText },
            second: { word: second.word, text: secondText },
            third: { word: third.word, text: thirdText },
        };

        const response = await fetch(
            "https://3words-backend-dawn-hill-2661.fly.dev/" +
                "write/" +
                wordsProposalId,
            {
                method: "PUT",
                headers: {
                    Authorization: "Bearer " + token,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(body),
            }
        );
        const responseData = await response.json();
        setWriting((prev) => ({
            ...prev,
            first: responseData.data.first,
            second: responseData.data.second,
            third: responseData.data.third,
        }));
        setIsLoading(false);
    };

    const writingOpenStateHandler = async (opened) => {
        setIsLoading(true);
        const response = await fetch(
            "https://3words-backend-dawn-hill-2661.fly.dev/" +
                "write/state/" +
                wordsProposalId,
            {
                method: "PATCH",
                headers: {
                    Authorization: "Bearer " + token,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ opened }),
            }
        );
        const responseData = await response.json();
        setWriting((prev) => ({ ...prev, opened: responseData.data.opened }));
        setIsLoading(false);
    };

    const resetWritingHandler = async () => {
        setIsLoading(true);
        const response = await fetch(
            "https://3words-backend-dawn-hill-2661.fly.dev/" +
                "write/" +
                wordsProposalId,
            {
                method: "DELETE",
                headers: { Authorization: "Bearer " + token },
            }
        );
        const responseData = await response.json();
        setWriting({
            first: responseData.data.first,
            second: responseData.data.second,
            third: responseData.data.third,
            opened: responseData.data.opened,
        });
        setIsLoading(false);
    };

    return (
        <section className="write-board-writing">
            {isLoading && (
                <div className="loading-text-container">
                    <p className="loading-text">Loading</p>
                </div>
            )}
            {<NavBackBar pageCloseHandler={pageCloseHandler} />}
            {!isLoading && first.word && second.word && third.word && (
                <>
                    <WriteBoardWritingCard
                        key={first.word}
                        id={first.word}
                        word={first.word}
                        text={first.text}
                        draggableAttributes={draggableAttributes}
                        droppableAttributes={droppableAttributes}
                    />
                    <WriteBoardWritingCard
                        key={second.word}
                        id={second.word}
                        word={second.word}
                        text={second.text}
                        draggableAttributes={draggableAttributes}
                        droppableAttributes={droppableAttributes}
                    />
                    <WriteBoardWritingCard
                        key={third.word}
                        id={third.word}
                        word={third.word}
                        text={third.text}
                        draggableAttributes={draggableAttributes}
                        droppableAttributes={droppableAttributes}
                    />
                    <WriteBoardWritingFooter>
                        <button type="button" onClick={saveWritingHandler}>
                            SAVE
                        </button>
                        <button
                            type="button"
                            onClick={() => {
                                writingOpenStateHandler(opened);
                            }}
                        >
                            {opened ? "HIDE TO PUBLIC" : "OPEN TO PUBLIC"}
                        </button>
                        <button type="button" onClick={resetWritingHandler}>
                            RESET
                        </button>
                    </WriteBoardWritingFooter>
                </>
            )}
        </section>
    );
};

export default WriteBoardWriting;
