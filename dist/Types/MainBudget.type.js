"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MainBudgetIdSchema = exports.CreateMainBudgetSchema = void 0;
const zod_1 = require("zod");
const payload = {
    body: (0, zod_1.object)({
        id_main_budget: (0, zod_1.optional)((0, zod_1.string)()),
        maxBudget: (0, zod_1.number)().min(0),
        userId: (0, zod_1.string)(),
        create_at: (0, zod_1.optional)((0, zod_1.date)()),
    }),
};
const params = {
    params: (0, zod_1.object)({
        id_main_budget: (0, zod_1.string)().min(30, { message: "budget tidak valid" }),
    }),
};
exports.CreateMainBudgetSchema = (0, zod_1.object)(Object.assign({}, payload));
exports.MainBudgetIdSchema = (0, zod_1.object)(Object.assign({}, params));
