import validator from "../../../validation/validator";

import useAuthHttp from "../../../hook/useAuthHttp";

import { useContext } from "react";

import AuthContext from "../../../store/AuthContext";

import Input from "../../Shared/FormElement/Input";

const Login = (props) => {
    const { toSignupFormHandler } = props;

    const { login } = useContext(AuthContext);
    const {
        formIsValid,
        formErrorMessage,
        formStateUpdateHandler,
        submitHandler,
    } = useAuthHttp(login);

    return (
        <section className="auth-board-container">
            <h2 className="auth-board-title">Login</h2>
            <form
                className="auth-board-form"
                onSubmit={(event) => submitHandler(event, "LOGIN")}
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
                        Login
                    </button>
                    <button type="button" onClick={toSignupFormHandler}>
                        to Signup
                    </button>
                </div>
            </form>
        </section>
    );
};

export default Login;
