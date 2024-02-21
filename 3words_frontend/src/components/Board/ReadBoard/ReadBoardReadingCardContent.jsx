import { CONSTANTS_FOR_TEXT_STYLE_EDIT } from "../../../util/textStyleEditFun";

import { useRef, useEffect } from "react";

const ReadBoardReadingContent = (props) => {
    const { text } = props;

    const textBox = useRef();

    useEffect(() => {
        textBox.current.innerHTML = text;
    });

    return (
        <section>
            <div
                ref={textBox}
                className="read-board-text-box"
                style={{
                    fontSize:
                        CONSTANTS_FOR_TEXT_STYLE_EDIT.style.fontSize
                            .FONT_SIZE_S,
                    fontWeight:
                        CONSTANTS_FOR_TEXT_STYLE_EDIT.style.fontWeight
                            .FONT_WEIGHT_1,
                }}
            ></div>
        </section>
    );
};

export default ReadBoardReadingContent;
