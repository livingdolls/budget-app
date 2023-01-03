"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginUserSchema = exports.RegisterUserSchema = void 0;
const zod_1 = require("zod");
const payload = {
    body: (0, zod_1.object)({
        _id_user: (0, zod_1.optional)((0, zod_1.string)()),
        nama: (0, zod_1.string)().min(6, { message: "Karakter minimal 6 huruf" }).max(16),
        email: (0, zod_1.string)().email(),
        password: (0, zod_1.string)()
            .min(6, { message: "Karakter minimal 6 huruf" })
            .max(16),
    }),
};
exports.RegisterUserSchema = (0, zod_1.object)(Object.assign({}, payload));
exports.LoginUserSchema = (0, zod_1.object)({
    body: (0, zod_1.object)({
        email: (0, zod_1.string)().email(),
        password: (0, zod_1.string)().min(6).max(16),
    }),
});
