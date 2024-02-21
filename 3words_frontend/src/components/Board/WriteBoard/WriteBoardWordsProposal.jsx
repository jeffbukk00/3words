const WriteBoardWordsProposal = (props) => {
    const {
        _id,
        // dayCount,
        first,
        second,
        third,
        wordsProposalSelectHandler,
        fetchedData,
    } = props;

    return (
        <div
            className="write-board-wordsProposal"
            onClick={() => {
                wordsProposalSelectHandler(_id, fetchedData);
            }}
        >
            {/* <span>{dayCount}</span> */}
            <div className="word-container">
                <span className="word-text">{first}</span>
            </div>
            <div className="word-container">
                <span className="word-text">{second}</span>
            </div>
            <div className="word-container">
                <span className="word-text">{third}</span>
            </div>
        </div>
    );
};

export default WriteBoardWordsProposal;
