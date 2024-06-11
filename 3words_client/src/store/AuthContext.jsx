import MODE from "../consts/mode";

import React, { useState, useEffect, useContext } from "react";

import ModeContext from "./ModeContext";

const AuthContext = React.createContext({
    isLoggedIn: false,
    token: "",
    isAdmin: false,
    login: () => {},
    logout: () => {},
    adminLogin: () => {}
});

export default AuthContext;

export const AuthContextProvider = (props) => {
    const { children } = props;

    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [token, setToken] = useState(null);
    const [isAdmin, setIsAdmin] = useState(false);

    const { modeChangeHandler } = useContext(ModeContext);

    useEffect(() => {
        const storedToken = localStorage.getItem("token");

        if (storedToken) {
            setIsLoggedIn(true);
            setToken(storedToken);

            modeChangeHandler(MODE.HOME);
        }

        const isAdmin = localStorage.getItem("isAdmin");

        if (isAdmin === "admintrue") {
            setIsAdmin(true);
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

    const adminLogin = () => {
        localStorage.setItem("isAdmin", "admintrue")
        setIsAdmin(true);
    }

    const adminLogout = () => {
        localStorage.removeItem("isAdmin");
        setIsAdmin(false);
    }

    const logout = () => {
        setIsLoggedIn(false);
        localStorage.removeItem("token");
        setToken(null);
        
        adminLogout();

        modeChangeHandler(MODE.HOME);
    };

    const value = {
        isLoggedIn,
        token,
        isAdmin,
        login,
        logout,
        adminLogin
    };

    return (
        <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
    );
};
