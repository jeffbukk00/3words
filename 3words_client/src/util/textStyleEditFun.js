//text-style-edit 관련 상수
export const CONSTANTS_FOR_TEXT_STYLE_EDIT = {
    direction: {
        FORWARD: "FORWARD",
        BACKWORD: "BACKWARD",
    },
    styleCategory: {
        CATEGORY_FONT_SIZE: "fontSize",
        CATEGORY_FONT_WEIGHT: "fontWeight",
    },
    style: {
        fontSize: {
            FONT_SIZE_S: "16px",
            FONT_SIZE_M: "32px",
            FONT_SIZE_L: "48px",
        },
        fontWeight: {
            FONT_WEIGHT_1: "300",
            FONT_WEIGHT_2: "500",
            FONT_WEIGHT_3: "700",
        },
    },
};

//selection 마우스 방향 판별
const getDirection = () => {
    const selection = window.getSelection();

    let { anchorNode, anchorOffset, focusNode, focusOffset } = selection;

    const range = document.createRange();

    range.setStart(anchorNode, anchorOffset);
    range.setEnd(focusNode, focusOffset);

    const direction = range.collapsed
        ? CONSTANTS_FOR_TEXT_STYLE_EDIT.direction.BACKWORD
        : CONSTANTS_FOR_TEXT_STYLE_EDIT.direction.FORWARD;

    if (direction === CONSTANTS_FOR_TEXT_STYLE_EDIT.direction.BACKWORD) {
        anchorNode = selection.focusNode;
        anchorOffset = selection.focusOffset;
        focusNode = selection.anchorNode;
        focusOffset = selection.anchorOffset;
    }

    return { anchorNode, anchorOffset, focusNode, focusOffset };
};

//스타일 적용
const applyStyle = (textNode, styleProperty, styleValue) => {
    appendStyledNewSpan(textNode, styleProperty, styleValue);
    // let isSearched = false;

    // const searchStyle = (node, styleProperty, styleValue) => {
    //     if (node.nodeType === 1 && node.tagName === "DIV") {
    //         return;
    //     }

    //     if (node.style?.[styleProperty] === styleValue) {
    //         isSearched = true;
    //         return;
    //     }

    //     return searchStyle(node.parentNode, styleProperty, styleValue);
    // };

    // searchStyle(textNode, styleProperty, styleValue);

    // if (!isSearched) {
    //     return appendStyledNewSpan(textNode, styleProperty, styleValue);
    // }
};

const appendStyledNewSpan = (textNode, styleProperty, styleValue) => {
    const newSpan = document.createElement("span");
    newSpan.style[styleProperty] = styleValue;
    textNode.parentNode.insertBefore(newSpan, textNode);
    newSpan.append(textNode);
};

const appendNotStyledNewSpan = (node) => {
    const newSpan = document.createElement("span");
    node.parentNode.insertBefore(newSpan, node);
    newSpan.append(node);
};

//anchorNode와 focusNode 사이에 있는 모든 textNode 찾기
const findTextNodes = (anchorNode, focusNode, word) => {
    const root = document.getElementById(`text-editor-${word}`);
    const textNodes = [];

    const traverseToRoot = (node, root, searched) => {
        if (node === root) {
            searched.push(node);
            return searched;
        }

        searched.push(node);
        return traverseToRoot(node.parentNode, root, searched);
    };

    const searchDescendant = (node) => {
        if (node.childNodes.length === 0 && node.nodeType === 3) {
            textNodes.push(node);
            return;
        }

        for (const n of node.childNodes) {
            searchDescendant(n);
        }
    };

    const findTextNodesInAnchorSide = (anchor, intersection) => {
        if (anchor === intersection || anchor.parentNode === intersection) {
            return anchor;
        }
        const anchorListToArray = Array.from(anchor.parentNode.childNodes);
        const listAfterAnchor = anchorListToArray.slice(
            anchorListToArray.findIndex((e) => e === anchor) + 1
        );

        for (const n of listAfterAnchor) {
            searchDescendant(n);
        }

        return findTextNodesInAnchorSide(anchor.parentNode, intersection);
    };

    const findTextNodesInFocusSide = (focus, intersection) => {
        if (focus === intersection || focus.parentNode === intersection) {
            return focus;
        }
        const focusListToArray = Array.from(focus.parentNode.childNodes);
        const listBeforeFocus = focusListToArray.slice(
            0,
            focusListToArray.findIndex((e) => e === focus)
        );

        for (const n of listBeforeFocus) {
            searchDescendant(n);
        }

        return findTextNodesInFocusSide(focus.parentNode, intersection);
    };

    const findTextNodesBetweenAnchorSideAndFocusSide = (
        anchorSide,
        focusSide,
        intersection
    ) => {
        if (anchorSide === intersection || focusSide === intersection) {
            return;
        }

        const intersectionChildNodesArray = Array.from(intersection.childNodes);
        const listBetween = intersectionChildNodesArray.slice(
            intersectionChildNodesArray.findIndex((e) => e === anchorSide) + 1,
            intersectionChildNodesArray.findIndex((e) => e === focusSide)
        );

        for (const n of listBetween) {
            searchDescendant(n);
        }
    };

    const traversedFromAnchorNode = traverseToRoot(anchorNode, root, []);
    const traversedFromFocusNode = traverseToRoot(focusNode, root, []);

    const intersection = traversedFromAnchorNode.find((e1) => {
        return traversedFromFocusNode.find((e2) => {
            return e1 === e2;
        })
            ? e1
            : undefined;
    });

    findTextNodesBetweenAnchorSideAndFocusSide(
        findTextNodesInAnchorSide(anchorNode, intersection),
        findTextNodesInFocusSide(focusNode, intersection),
        intersection
    );

    return textNodes;
};

//노드 분할
const splitNode = (selection) => {
    const { anchorNode, anchorOffset, focusNode, focusOffset } = selection;

    const textBeforeAnchorOffset = anchorNode.textContent.slice(
        0,
        anchorOffset
    );
    const textAfterFocusOffset = focusNode.textContent.slice(focusOffset);

    const isEqual = anchorNode === focusNode;

    if (isEqual) {
        const styledNode = anchorNode;
        if (
            textBeforeAnchorOffset.length === 0 &&
            textAfterFocusOffset.length === 0
        ) {
        } else if (textBeforeAnchorOffset.length === 0) {
            const nodeAfterFocusOffset = styledNode.splitText(focusOffset);
            appendNotStyledNewSpan(nodeAfterFocusOffset);
        } else if (textAfterFocusOffset.length === 0) {
            styledNode.deleteData(0, anchorOffset);
            const nodeBeforeAnchorOffset = new Text(textBeforeAnchorOffset);
            anchorNode.parentNode.insertBefore(
                nodeBeforeAnchorOffset,
                anchorNode
            );
            appendNotStyledNewSpan(nodeBeforeAnchorOffset);
        } else {
            const nodeAfterFocusOffset = styledNode.splitText(focusOffset);
            appendNotStyledNewSpan(nodeAfterFocusOffset);

            styledNode.deleteData(0, anchorOffset);
            const nodeBeforeAnchorOffset = new Text(textBeforeAnchorOffset);
            anchorNode.parentNode.insertBefore(
                nodeBeforeAnchorOffset,
                anchorNode
            );
            appendNotStyledNewSpan(nodeBeforeAnchorOffset);
        }

        return {
            isEqual,
            styledNode,
        };
    } else {
        const styledNodeInFocusNode = focusNode;

        const styledNodeInAnchorNode = anchorNode;
        if (
            textBeforeAnchorOffset.length === 0 &&
            textAfterFocusOffset.length === 0
        ) {
        } else if (textBeforeAnchorOffset.length === 0) {
            const nodeAfterFocusOffset =
                styledNodeInFocusNode.splitText(focusOffset);
            appendNotStyledNewSpan(nodeAfterFocusOffset);
        } else if (textAfterFocusOffset.length === 0) {
            styledNodeInAnchorNode.deleteData(0, anchorOffset);
            const nodeBeforeAnchorOffset = new Text(textBeforeAnchorOffset);
            anchorNode.parentNode.insertBefore(
                nodeBeforeAnchorOffset,
                anchorNode
            );
            appendNotStyledNewSpan(nodeBeforeAnchorOffset);
        } else {
            const nodeAfterFocusOffset =
                styledNodeInFocusNode.splitText(focusOffset);
            appendNotStyledNewSpan(nodeAfterFocusOffset);

            styledNodeInAnchorNode.deleteData(0, anchorOffset);
            const nodeBeforeAnchorOffset = new Text(textBeforeAnchorOffset);
            anchorNode.parentNode.insertBefore(
                nodeBeforeAnchorOffset,
                anchorNode
            );
            appendNotStyledNewSpan(nodeBeforeAnchorOffset);
        }

        return {
            isEqual,
            styledNodeInAnchorNode,
            styledNodeInFocusNode,
        };
    }
};

export const textStyleEditHandler = (styleProperty, styleValue, word) => {
    const selection = getDirection();

    const textNodesBetweenAnchorNodeAndFocusNode = findTextNodes(
        selection.anchorNode,
        selection.focusNode,
        word
    );

    const resultOfSplitNode = splitNode(selection);
    const splittedAnchorNodeAndFocusNode = [];

    if (resultOfSplitNode.isEqual) {
        splittedAnchorNodeAndFocusNode.push(resultOfSplitNode.styledNode);
    } else {
        splittedAnchorNodeAndFocusNode.push(
            resultOfSplitNode.styledNodeInAnchorNode
        );
        splittedAnchorNodeAndFocusNode.push(
            resultOfSplitNode.styledNodeInFocusNode
        );
    }

    for (const n of splittedAnchorNodeAndFocusNode) {
        applyStyle(n, styleProperty, styleValue);
    }

    for (const n of textNodesBetweenAnchorNodeAndFocusNode) {
        applyStyle(n, styleProperty, styleValue);
    }

    return window.getSelection().removeAllRanges();
};
