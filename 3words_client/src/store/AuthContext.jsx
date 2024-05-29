import MODE from "../consts/mode";

import React, { useState, useEffect, useContext } from "react";

import ModeContext from "./ModeContext";

const AuthContext = React.createContext({
    isLoggedIn: false,
    token: "",
    login: () => {},
    logout: () => {},
});

export default AuthContext;

export const AuthContextProvider = (props) => {
    const { children } = props;

    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [token, setToken] = useState(null);

    const { modeChangeHandler } = useContext(ModeContext);

    useEffect(() => {
        const storedToken = localStorage.getItem("token");

        if (storedToken) {
            setIsLoggedIn(true);
            setToken(storedToken);

            modeChangeHandler(MODE.HOME);
        }
    }, []);

    const login = (token) => {
        if (token) {
            setIsLoggedIn(true);

            localStorage.setItem("token", token);
            setToken(token);

            modeChangeHandler(MODE.HOME);
        }
    };

    const logout = () => {
        setIsLoggedIn(false);
        localStorage.removeItem("token");
        setToken(null);

        modeChangeHandler(MODE.HOME);
    };

    const value = {
        isLoggedIn,
        token,
        login,
        logout,
    };

    return (
        <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
    );
};
