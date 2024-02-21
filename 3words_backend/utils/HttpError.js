class HttpError {
    constructor(errorStatus, errorMessage) {
        this.errorStatus = errorStatus;
        this.errorMessage = errorMessage;
    }
}

module.exports = HttpError;
