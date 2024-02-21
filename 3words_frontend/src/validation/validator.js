export default {
    required: () => {
        return (value) => {
            return {
                isValid: value.length > 0,
                errorMessage: "비우지 말아주세요.",
            };
        };
    },
    minLength: (min) => {
        return (value) => {
            return { isValid: value.length > min, errorMessage: "minLength" };
        };
    },
};
