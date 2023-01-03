"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExpensePlanService = exports.FindMainBudgetByIdService = exports.DeleteMainBudgetService = exports.FindMainBudgetService = exports.CreateMainBudgetService = void 0;
const dbClient_1 = __importDefault(require("../config/dbClient"));
const CreateMainBudgetService = (userId) => {
    const respon = dbClient_1.default.mainBudget.create({
        data: {
            maxBudget: 0,
            userId: userId.userId,
        },
    });
    return respon;
};
exports.CreateMainBudgetService = CreateMainBudgetService;
const FindMainBudgetService = (userId) => {
    const respon = dbClient_1.default.mainBudget.findUnique({
        where: {
            userId: userId.userId,
        },
        include: {
            user: {
                select: {
                    id_user: true,
                    nama: true,
                    email: true,
                },
            },
        },
    });
    return respon;
};
exports.FindMainBudgetService = FindMainBudgetService;
const DeleteMainBudgetService = (id) => {
    const respon = dbClient_1.default.mainBudget.delete({
        where: id,
    });
    return respon;
};
exports.DeleteMainBudgetService = DeleteMainBudgetService;
const FindMainBudgetByIdService = (idUser) => __awaiter(void 0, void 0, void 0, function* () {
    const respon = yield dbClient_1.default.mainBudget.findUnique({
        where: {
            userId: idUser.userId,
        },
    });
    return respon;
});
exports.FindMainBudgetByIdService = FindMainBudgetByIdService;
const ExpensePlanService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const respon = yield dbClient_1.default.mainBudget.findUnique({
        where: {
            userId: id.userId,
        },
        include: {
            expensive: true,
        },
    });
    return respon;
});
exports.ExpensePlanService = ExpensePlanService;
