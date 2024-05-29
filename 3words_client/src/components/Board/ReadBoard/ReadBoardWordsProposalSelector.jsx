import useInfiniteScroll from "../../../hook/useInfiniteScroll";

import ReadBoardWordsProposal from "./ReadBoardWordsProposal";

const ReadBoardWordsProposalSelector = (props) => {
    const {
        wordsProposalSelectHandler,
        scrollPosition,
        fetchedWordsProposalData,
    } = props;

    const FETCH_URL =
    import.meta.env.VITE_SERVER_HOST + "/wordsProposal";

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
