// 2 중첩.

export default (obj) => {
    let deepCopied = { ...obj };

    Object.keys(deepCopied).forEach((e) => {
        deepCopied[e] = { ...deepCopied[e] };
    });

    return deepCopied;
};
