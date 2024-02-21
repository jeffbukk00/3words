import MODE from "../consts/mode";

import React, { useState } from "react";

const modeContextConfig = {
    mode: 0,
    modeChangeHandler: (mode) => {},
};

const ModeContext = React.createContext(modeContextConfig);

export const ModeContextProvider = (props) => {
    const { children } = props;

    const [mode, setMode] = useState(MODE.HOME);

    const modeChangeHandler = (mode) => setMode(mode);

    const value = {
        mode,
        modeChangeHandler,
    };

    return (
        <ModeContext.Provider value={value}>{children}</ModeContext.Provider>
    );
};

export default ModeContext;
