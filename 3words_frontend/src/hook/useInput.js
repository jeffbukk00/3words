import { useReducer, useRef } from "react";

const ACTION_TYPE_CHANGE = 0;
const ACTION_TYPE_FOCUS = 1;
const ACTION_TYPE_BLUR = 2;

const reducer = (state, action) => {
    if (action.type === ACTION_TYPE_CHANGE) {
        return { ...state, value: action.payload };
    }

    if (action.type === ACTION_TYPE_FOCUS) {
        return { ...state, isFocused: true };
    }

    if (action.type === ACTION_TYPE_BLUR) {
        return { ...state, isFocused: false };
    }

    return state;
};

const useInput = (validators) => {
    const [userInputState, dispatch] = useReducer(reducer, {
        value: "",
        isFocused: false,
    });

    const focusCount = useRef(0);

    let isValid = true;
    let inputErrorMessage = "";

    for (const v of validators) {
        const validationResult = v(userInputState.value);
        if (!validationResult.isValid) {
            isValid = false;
            inputErrorMessage = validationResult.errorMessage;
            break;
        }
    }

    let invalidInvisible = true;

    if (userInputState.isFocused) {
        invalidInvisible = true;
    } else {
        invalidInvisible = false;
    }

    if (focusCount.current === 0) {
        invalidInvisible = true;
    }

    const inputChangeHandler = (event) =>
        dispatch({ type: ACTION_TYPE_CHANGE, payload: event.target.value });

    const focusHandler = () => {
        if (focusCount.current === 0) {
            focusCount.current++;
        }
        dispatch({ type: ACTION_TYPE_FOCUS });
    };

    const blurHandler = () => dispatch({ type: ACTION_TYPE_BLUR });

    return {
        value: userInputState.value,
        isValid,
        invalidInvisible,
        inputErrorMessage,
        inputChangeHandler,
        focusHandler,
        blurHandler,
    };
};

export default useInput;
