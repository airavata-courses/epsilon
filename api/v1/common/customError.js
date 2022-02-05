class CustomError extends Error {
    constructor(message, status) {
        super(message)
        Error.captureStackTrace(this, this.constructor);
        this.response = {}
        this.response.status = status
        this.response.data = {}
        this.response.data.msg = this.message;
        this.response.name = this.constructor.name;
    }
}

module.exports = CustomError;