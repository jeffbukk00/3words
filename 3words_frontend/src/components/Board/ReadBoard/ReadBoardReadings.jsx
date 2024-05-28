import useInfiniteScroll from "../../../hook/useInfiniteScroll";

import ReadBoardReading from "./ReadBoardReading";
import NavBackBar from "../../Shared/UI/NavBackBar";

const ReadBoardReadings = (props) => {
    const { wordsProposalId, pageCloseHandler } = props;

    const FETCH_URL =
        import.meta.env.VITE_SERVER_HOST +
        "/read/" +
        wordsProposalId;

    const { fetchedData, isLoading } = useInfiniteScroll(
        3,
        "_id",
        FETCH_URL,
        "read-board"
    );

    return (
        <section className="read-board-readings">
            {isLoading && (
                <div className="loading-text-container">
                    <p className="loading-text">Loading</p>
                </div>
            )}
            {!isLoading && <NavBackBar pageCloseHandler={pageCloseHandler} />}
            {!isLoading && fetchedData.length === 0 && (
                <div className="read-board-readings-empty">
                    <p>아직 글이 없습니다.</p>
                </div>
            )}
            {fetchedData.length > 0 &&
                !isLoading &&
                fetchedData.map((e) => <ReadBoardReading key={e._id} {...e} />)}
        </section>
    );
};

export default ReadBoardReadings;
