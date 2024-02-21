import { useState } from "react";

import WriteBoardWordsProposalSelector from "./WriteBoardWordsProposalSelector";
import WriteBoardWriting from "./WriteBoardWriting";

const WriteBoard = (props) => {
    const [writeBoardState, setWriteBoardState] = useState({
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
            ".write-board.infinite-scroll-container"
        );
        setWriteBoardState({
            isSelected: true,
            wordsProposalId,
            scrollPosition: scrollContainer.scrollTop,
            fetchedWordsProposalData,
        });
    };

    const pageCloseHandler = () => {
        setWriteBoardState((prev) => ({ ...prev, isSelected: false }));
    };

    return (
        <main className="write-board infinite-scroll-container">
            {!writeBoardState.isSelected && (
                <WriteBoardWordsProposalSelector
                    wordsProposalSelectHandler={wordsProposalSelectHandler}
                    scrollPosition={writeBoardState.scrollPosition}
                    fetchedWordsProposalData={
                        writeBoardState.fetchedWordsProposalData
                    }
                />
            )}
            {writeBoardState.isSelected && (
                <WriteBoardWriting
                    wordsProposalId={writeBoardState.wordsProposalId}
                    pageCloseHandler={pageCloseHandler}
                />
            )}
        </main>
    );
};

export default WriteBoard;
