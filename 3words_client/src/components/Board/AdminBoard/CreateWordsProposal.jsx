import { useContext, useState } from "react";
import { SERVER_HOST } from "../../../consts/server";
import AuthContext from "../../../store/AuthContext";

const CreateWordsProposal = () => {
  const [wordsProposal, setWordsProposal] = useState({
    first: "",
    second: "",
    third: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState({ isSuccess: false, message: "" });
  const [isError, setIsError] = useState({ isError: false, message: "" });

  const { token } = useContext(AuthContext);

  const initializeState = () => {
    setIsLoading(false);
    setIsSuccess({ isSuccess: false, message: "" });
    setIsError({ isError: false, message: "" });
  };

  return (
    <div className="proposal-creation-box" onClick={initializeState}>
      <form
        onSubmit={async (event) => {
          event.preventDefault();
          setIsLoading(true);
          const body = JSON.stringify({
            first: wordsProposal.first,
            second: wordsProposal.second,
            third: wordsProposal.third,
          });

          const response = await fetch(SERVER_HOST + "/wordsProposal", {
            method: "POST",
            headers: {
              Authorization: "Bearer " + token,
              "Content-Type": "application/json",
            },
            body,
          });

          const isSuccess = response.ok;
          setIsLoading(false);
          if (isSuccess) {
            setIsSuccess({ isSuccess: true, message: "생성 성공!" });
          } else {
            setIsError({ isError: true, message: "생성 실패!" });
          }
        }}
      >
        <div className="word-input-container">
          <div className="text-center">
            {isLoading && <p>로딩 중입니다...</p>}
            {isSuccess.isSuccess && (
              <p className="success-feedback">{isSuccess.message}</p>
            )}
            {isError.isError && (
              <p className="error-feedback">{isError.message}</p>
            )}
          </div>
          <input
            type="text"
            name="first"
            required
            onChange={(event) =>
              setWordsProposal((prev) => {
                const updated = { ...prev };
                updated.first = event.target.value;
                return updated;
              })
            }
          />
          <input
            type="text"
            name="second"
            required
            onChange={(event) =>
              setWordsProposal((prev) => {
                const updated = { ...prev };
                updated.second = event.target.value;
                return updated;
              })
            }
          />
          <input
            type="text"
            name="third"
            required
            onChange={(event) =>
              setWordsProposal((prev) => {
                const updated = { ...prev };
                updated.third = event.target.value;
                return updated;
              })
            }
          />
        </div>
        <div className="proposal-creation-action-box">
          <button type="submit" className="">
            제출
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateWordsProposal;
