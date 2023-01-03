"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Respon = void 0;
const Respon = (statusCode, success, data, message, res) => {
    res.status(statusCode).json({
        code: statusCode,
        success: success,
        data: data,
        message: message,
    });
};
exports.Respon = Respon;
