import { useState } from "react";

import Signup from "./Signup";
import Login from "./Login";

const AuthBoard = (props) => {
    const [isLoginForm, setIsLoginForm] = useState(true);

    return (
        <main className="auth-board">
            {!isLoginForm && (
                <Signup toLoginFormHandler={() => setIsLoginForm(true)} />
            )}
            {isLoginForm && (
                <Login toSignupFormHandler={() => setIsLoginForm(false)} />
            )}
        </main>
    );
};

export default AuthBoard;
