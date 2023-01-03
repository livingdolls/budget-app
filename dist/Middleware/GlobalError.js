"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateError = void 0;
const CreateError = (status, message) => {
    const err = new Error();
    err.message = message;
    err.status = status;
    return err;
};
exports.CreateError = CreateError;
