import { useEffect } from "react";

import useInput from "../../../hook/useInput";

const Input = (props) => {
    const { className = "" } = props;
    const { tag = "input" } = props;
    const { label = "" } = props;
    const { ...inputElementAttributes } = props.inputElementAttributes || {};
    const { ...textareaElementAttributes } =
        props.teaxareaElementAttributes || {};
    const { validators = [] } = props;
    const { formStateUpdateHandler } = props;

    const {
        value,
        isValid,
        invalidInvisible,
        inputErrorMessage,
        inputChangeHandler,
        focusHandler,
        blurHandler,
    } = useInput(validators);

    useEffect(() => {
        formStateUpdateHandler(inputElementAttributes.name, value, isValid);
    }, [inputElementAttributes.name, value, isValid]);

    let content = (
        <input
            className={className}
            {...inputElementAttributes}
            value={value}
            onChange={inputChangeHandler}
            onFocus={focusHandler}
            onBlur={blurHandler}
        />
    );

    if (tag === "textarea") {
        content = (
            <textarea
                className={className}
                {...inputElementAttributes}
                {...textareaElementAttributes}
                value={value}
                onChange={inputChangeHandler}
                onFocus={focusHandler}
                onBlur={blurHandler}
            ></textarea>
        );
    }

    return (
        <>
            {label && (
                <label htmlFor={inputElementAttributes.id}>{label}</label>
            )}
            {content}
            {!isValid && !invalidInvisible ? (
                <p className="input-error-message">{inputErrorMessage}</p>
            ) : (
                ""
            )}
        </>
    );
};

export default Input;
