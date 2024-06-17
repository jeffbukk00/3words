// 2 중첩.

export default (obj) => {
  let deepCopied = { ...obj };

  Object.keys(deepCopied).forEach((e) => {
    if (e === "opened") {
      return;
    }
    deepCopied[e] = { ...deepCopied[e] };
  });

  return deepCopied;
};
