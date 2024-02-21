import {
    CONSTANTS_FOR_TEXT_STYLE_EDIT,
    textStyleEditHandler,
} from "../../../../util/textStyleEditFun";

const TextStyleEditor = (props) => {
    const { word, textStyleEditorCloseHandler } = props;

    return (
        <div className="text-style-editor">
            <span>size</span>
            <button
                onClick={() => {
                    textStyleEditHandler(
                        CONSTANTS_FOR_TEXT_STYLE_EDIT.styleCategory
                            .CATEGORY_FONT_SIZE,
                        CONSTANTS_FOR_TEXT_STYLE_EDIT.style.fontSize
                            .FONT_SIZE_S,
                        word
                    );
                    textStyleEditorCloseHandler();
                }}
            >
                S
            </button>
            <button
                onClick={() => {
                    textStyleEditHandler(
                        CONSTANTS_FOR_TEXT_STYLE_EDIT.styleCategory
                            .CATEGORY_FONT_SIZE,
                        CONSTANTS_FOR_TEXT_STYLE_EDIT.style.fontSize
                            .FONT_SIZE_M,
                        word
                    );
                    textStyleEditorCloseHandler();
                }}
            >
                M
            </button>
            <button
                onClick={() => {
                    textStyleEditHandler(
                        CONSTANTS_FOR_TEXT_STYLE_EDIT.styleCategory
                            .CATEGORY_FONT_SIZE,
                        CONSTANTS_FOR_TEXT_STYLE_EDIT.style.fontSize
                            .FONT_SIZE_L,
                        word
                    );
                    textStyleEditorCloseHandler();
                }}
            >
                L
            </button>

            <span>weight</span>
            <button
                onClick={() => {
                    textStyleEditHandler(
                        CONSTANTS_FOR_TEXT_STYLE_EDIT.styleCategory
                            .CATEGORY_FONT_WEIGHT,
                        CONSTANTS_FOR_TEXT_STYLE_EDIT.style.fontWeight
                            .FONT_WEIGHT_1,
                        word
                    );
                    textStyleEditorCloseHandler();
                }}
            >
                1
            </button>
            <button
                onClick={() => {
                    textStyleEditHandler(
                        CONSTANTS_FOR_TEXT_STYLE_EDIT.styleCategory
                            .CATEGORY_FONT_WEIGHT,
                        CONSTANTS_FOR_TEXT_STYLE_EDIT.style.fontWeight
                            .FONT_WEIGHT_2,
                        word
                    );
                    textStyleEditorCloseHandler();
                }}
            >
                2
            </button>
            <button
                onClick={() => {
                    textStyleEditHandler(
                        CONSTANTS_FOR_TEXT_STYLE_EDIT.styleCategory
                            .CATEGORY_FONT_WEIGHT,
                        CONSTANTS_FOR_TEXT_STYLE_EDIT.style.fontWeight
                            .FONT_WEIGHT_3,
                        word
                    );
                    textStyleEditorCloseHandler();
                }}
            >
                3
            </button>
        </div>
    );
};

export default TextStyleEditor;
