import MODE from "../../consts/mode";

import { useContext } from "react";

import ModeContext from "../../store/ModeContext";
import AuthContext from "../../store/AuthContext";

import HomeBoard from "./HomeBoard/HomeBoard";
import AuthBoard from "./AuthBoard/AuthBoard";
import ReadBoard from "./ReadBoard/ReadBoard";
import WriteBoard from "./WriteBoard/WriteBoard";
import HelpBoard from "./HelpBoard/HelpBoard";
import AdminBoard from "./AdminBoard/AdminBoard";

const Board = (props) => {
    const { mode } = useContext(ModeContext);
    const { isLoggedIn, isAdmin} = useContext(AuthContext);
    

    return (
        <>
            {mode === MODE.HOME && <HomeBoard />}
            {mode === MODE.ADMIN&& isAdmin && <AdminBoard/>}
            {mode === MODE.AUTH && !isLoggedIn && <AuthBoard />}
            {mode === MODE.READ && <ReadBoard />}
            {mode === MODE.WRITE && isLoggedIn && <WriteBoard />}
            {mode === MODE.HELP && <HelpBoard />}
        </>
    );
};

export default Board;
