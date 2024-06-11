import { SERVER_HOST } from "../../../consts/server";
import useInfiniteScroll from "../../../hook/useInfiniteScroll";

import WriteBoardWordsProposal from "./WriteBoardWordsProposal";

const WriteBoardWordsProposalSelector = (props) => {
    const {
        wordsProposalSelectHandler,
        scrollPosition,
        fetchedWordsProposalData,
    } = props;

    const FETCH_URL =
    SERVER_HOST + "/wordsProposal";

    const { fetchedData, isLoading } = useInfiniteScroll(
        6,
        "date",
        FETCH_URL,
        "write-board",
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
                    <WriteBoardWordsProposal
                        key={e._id}
                        {...e}
                        wordsProposalSelectHandler={wordsProposalSelectHandler}
                        fetchedData={fetchedData}
                    />
                ))}
        </>
    );
};

export default WriteBoardWordsProposalSelector;
