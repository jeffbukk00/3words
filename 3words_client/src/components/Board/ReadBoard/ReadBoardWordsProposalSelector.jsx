import useInfiniteScroll from "../../../hook/useInfiniteScroll";
import {SERVER_HOST} from "../../../consts/server"

import ReadBoardWordsProposal from "./ReadBoardWordsProposal";

const ReadBoardWordsProposalSelector = (props) => {
    const {
        wordsProposalSelectHandler,
        scrollPosition,
        fetchedWordsProposalData,
    } = props;

    const FETCH_URL =
    SERVER_HOST + "/wordsProposal";

    const { fetchedData, isLoading } = useInfiniteScroll(
        6,
        "dayCount",
        FETCH_URL,
        "read-board",
        scrollPosition,
        fetchedWordsProposalData
    );

    return (
        <>
            {isLoading && (
                <div className="loading-text-container">
                    <p className="loading-text">Loading</p>
                </div>
            )}
            {fetchedData.length > 0 &&
                !isLoading &&
                fetchedData.map((e) => (
                    <ReadBoardWordsProposal
                        key={e._id}
                        {...e}
                        wordsProposalSelectHandler={wordsProposalSelectHandler}
                        fetchedData={fetchedData}
                    />
                ))}
        </>
    );
};

export default ReadBoardWordsProposalSelector;
