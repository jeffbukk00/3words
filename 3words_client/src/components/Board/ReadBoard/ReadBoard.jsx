import { useState } from "react";

import ReadBoardWordsProposalSelector from "./ReadBoardWordsProposalSelector";
import ReadBoardReadings from "./ReadBoardReadings";

const ReadBoard = (props) => {
    const [readBoardState, setReadBoardState] = useState({
        isSelected: false,
        wordsProposalId: null,
        scrollPosition: null,
        fetchedWordsProposalData: [],
    });

    const wordsProposalSelectHandler = (
        wordsProposalId,
        fetchedWordsProposalData
    ) => {
        const scrollContainer = document.querySelector(
            ".read-board.infinite-scroll-container"
        );

        return setReadBoardState({
            isSelected: true,
            wordsProposalId,
            scrollPosition: scrollContainer.scrollTop,
            fetchedWordsProposalData,
        });
    };

    const pageCloseHandler = () => {
        setReadBoardState((prev) => ({ ...prev, isSelected: false }));
    };

    return (
        <main className="read-board infinite-scroll-container">
            {!readBoardState.isSelected && (
                <ReadBoardWordsProposalSelector
                    wordsProposalSelectHandler={wordsProposalSelectHandler}
                    scrollPosition={readBoardState.scrollPosition}
                    fetchedWordsProposalData={
                        readBoardState.fetchedWordsProposalData
                    }
                />
            )}
            {readBoardState.isSelected && (
                <ReadBoardReadings
                    wordsProposalId={readBoardState.wordsProposalId}
                    pageCloseHandler={pageCloseHandler}
                />
            )}
        </main>
    );
};

export default ReadBoard;
