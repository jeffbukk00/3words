import { useContext, useState } from "react";

import { SERVER_HOST } from "../consts/server";
import deepCopyObj from "../util/deepCopyObj";
import AuthContext from "../store/AuthContext";

const useAuthHttp = (loginHandler) => {
  const [formState, setFormState] = useState({});
  const [formErrorMessage, setFormErrorMessage] = useState("");
  const { adminLogin } = useContext(AuthContext);

  let formIsValid = false;

  formIsValid = Object.keys(formState).every((e) => formState[e].isValid);

  const formStateUpdateHandler = (name, value, isValid) => {
    if (name in formState) {
      setFormState((prev) => {
        let deepCopied = deepCopyObj(prev);

        deepCopied[name].value = value;
        deepCopied[name].isValid = isValid;

        return deepCopied;
      });
    } else {
      setFormState((prev) => {
        let deepCopied = deepCopyObj(prev);

        deepCopied[name] = {};
        deepCopied[name].value = value;
        deepCopied[name].isValid = isValid;

        return deepCopied;
      });
    }
  };

  const submitHandler = async (event, formType) => {
    event.preventDefault();

    const fd = new FormData(event.target);
    const data = Object.fromEntries(fd.entries());

    try {
      const response = await fetch(
        SERVER_HOST +
          "/auth/" +
          `${formType === "SIGNUP" ? "signup" : "login"}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        }
      );

      const responseData = await response.json();

      if (!response.ok) {
        setFormErrorMessage(responseData.errorMessage);
      }

      loginHandler(responseData.token);
      if (responseData.isAdmin) {
        adminLogin();
      }
    } catch (e) {
      console.log("네트워크 오류 혹은 다른 예상 밖 오류.");
      console.log(e);
    }
  };
  return {
    formIsValid,
    formErrorMessage,
    formStateUpdateHandler,
    submitHandler,
  };
};

export default useAuthHttp;
