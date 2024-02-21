import MODE from "../../consts/mode";

import { useContext } from "react";

import ModeContext from "../../store/ModeContext";
import AuthContext from "../../store/AuthContext";

const Sidebar = (props) => {
    const { mode, modeChangeHandler } = useContext(ModeContext);
    const { isLoggedIn, logout } = useContext(AuthContext);

    return (
        <aside className="sidebar">
            <div className="sidebar-actions">
                <button
                    className={`mode-button ${
                        mode === MODE.HOME ? "mode-selected" : "mode-unselected"
                    }`}
                    type="button"
                    onClick={() => {
                        modeChangeHandler(MODE.HOME);
                    }}
                >
                    HOME
                </button>
                <button
                    className={`mode-button ${
                        mode === MODE.AUTH ? "mode-selected" : "mode-unselected"
                    }`}
                    type="button"
                    onClick={
                        isLoggedIn
                            ? logout
                            : () => {
                                  modeChangeHandler(MODE.AUTH);
                              }
                    }
                >{`${isLoggedIn ? "LOGOUT" : "LOGIN"}`}</button>
                <button
                    className={`mode-button ${
                        mode === MODE.READ ? "mode-selected" : "mode-unselected"
                    }`}
                    type="button"
                    onClick={() => {
                        modeChangeHandler(MODE.READ);
                    }}
                >
                    READ
                </button>
                {isLoggedIn && (
                    <button
                        className={`mode-button ${
                            mode === MODE.WRITE
                                ? "mode-selected"
                                : "mode-unselected"
                        }`}
                        type="button"
                        onClick={() => {
                            modeChangeHandler(MODE.WRITE);
                        }}
                    >
                        WRITE
                    </button>
                )}
            </div>
            <div className="sidebar-bottom">
                <button
                    className={`mode-button ${
                        mode === MODE.HELP ? "mode-selected" : "mode-unselected"
                    }`}
                    type="button"
                    onClick={() => {
                        modeChangeHandler(MODE.HELP);
                    }}
                >
                    HELP
                </button>
                <div className="sidebar-bottom-color-block"></div>
            </div>
        </aside>
    );
};

export default Sidebar;
