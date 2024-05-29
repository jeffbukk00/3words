import validator from "../../../validation/validator";

import useForm from "../../../hook/useForm";
import { useContext } from "react";

import AuthContext from "../../../store/AuthContext";

import Input from "../../Shared/FormElement/Input";

const Signup = (props) => {
    const { toLoginFormHandler } = props;

    const { login } = useContext(AuthContext);

    const {
        formIsValid,
        formErrorMessage,
        formStateUpdateHandler,
        submitHandler,
    } = useForm(login);

    return (
        <section className="auth-board-container">
            <h2 className="auth-board-title">Signup</h2>
            <form
                className="auth-board-form"
                onSubmit={(event) => submitHandler(event, "SIGNUP")}
            >
                <div className="auth-board-form-controls">
                    {formErrorMessage && (
                        <p className="form-error-message">{formErrorMessage}</p>
                    )}
                    <div className="auth-board-form-control">
                        <Input
                            tag="input"
                            label="name"
                            inputElementAttributes={{
                                type: "text",
                                id: "name",
                                name: "name",
                            }}
                            validators={[validator.required()]}
                            formStateUpdateHandler={formStateUpdateHandler}
                        />
                    </div>
                    <div className="auth-board-form-control">
                        <Input
                            tag="input"
                            label="password"
                            inputElementAttributes={{
                                type: "password",
                                id: "password",
                                name: "password",
                            }}
                            validators={[validator.required()]}
                            formStateUpdateHandler={formStateUpdateHandler}
                        />
                    </div>
                </div>
                <div className="auth-board-actions">
                    <button type="submit" disabled={!formIsValid}>
                        Signup
                    </button>
                    <button type="button" onClick={toLoginFormHandler}>
                        to Login
                    </button>
                </div>
            </form>
        </section>
    );
};

export default Signup;
