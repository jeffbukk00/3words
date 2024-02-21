import { CONSTANTS_FOR_TEXT_STYLE_EDIT } from "../../../../util/textStyleEditFun";

import { useState, useRef, useEffect } from "react";

import TextStyleEditor from "./TextStyleEditor";
import Overlay from "../../UI/Overlay";

const TextEditor = (props) => {
    const { word, text } = props;

    const [textStyleEditorState, setTextStyleEditorState] = useState({
        isSelected: false,
        selectionStartCoords: [null, null],
        selectionCoords: [null, null],
    });

    const textEditor = useRef();

    useEffect(() => {
        textEditor.current.innerHTML = text;
    }, [text]);

    const selectStartHandler = (event) => {
        setTextStyleEditorState((prev) => ({
            ...prev,
            selectionStartCoords: [event.clientX, event.clientY],
        }));
    };

    const selectEndHandler = (event) => {
        const selection = window.getSelection();
        if (selection.type === "Caret") {
            return;
        }
        let { anchorNode, anchorOffset, focusNode, focusOffset } = selection;

        const range = document.createRange();

        range.setStart(anchorNode, anchorOffset);
        range.setEnd(focusNode, focusOffset);

        if (range.collapsed) {
            return setTextStyleEditorState((prev) => ({
                ...prev,
                isSelected: true,
                selectionCoords: [
                    event.clientX,
                    prev.selectionStartCoords[1] + 25,
                ],
            }));
        }

        return setTextStyleEditorState((prev) => ({
            ...prev,
            isSelected: true,
            selectionCoords: [
                prev.selectionStartCoords[0],
                prev.selectionStartCoords[1] - 65,
            ],
        }));
    };

    const textStyleEditorCloseHandler = () => {
        window.getSelection().removeAllRanges();
        setTextStyleEditorState({
            isSelected: false,
            selectionCoords: [null, null],
        });
    };

    return (
        <>
            {textStyleEditorState.isSelected && (
                <Overlay
                    backdropClassName="backdrop-transparent"
                    closeOverlayHandler={textStyleEditorCloseHandler}
                    modalPosition={textStyleEditorState.selectionCoords}
                    backdropped={true}
                >
                    <TextStyleEditor
                        word={word}
                        textStyleEditorCloseHandler={
                            textStyleEditorCloseHandler
                        }
                    />
                </Overlay>
            )}

            <div
                ref={textEditor}
                id={`text-editor-${word}`}
                className="text-editor"
                contentEditable="true"
                suppressContentEditableWarning={true}
                style={{
                    fontSize:
                        CONSTANTS_FOR_TEXT_STYLE_EDIT.style.fontSize
                            .FONT_SIZE_S,
                    fontWeight:
                        CONSTANTS_FOR_TEXT_STYLE_EDIT.style.fontWeight
                            .FONT_WEIGHT_1,
                }}
                onMouseDown={selectStartHandler}
                onMouseUp={selectEndHandler}
            ></div>
        </>
    );
};

export default TextEditor;
