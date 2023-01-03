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
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteMainBudgetController = exports.FindMainBudgetController = exports.CreateMainBudgetController = void 0;
const MainBudget_service_1 = require("../Services/MainBudget.service");
const Respon_1 = require("../Utils/Respon");
const CreateMainBudgetController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const respon = yield (0, MainBudget_service_1.CreateMainBudgetService)(req.body);
        return (0, Respon_1.Respon)(201, true, respon, "berhasil membuat budget", res);
    }
    catch (error) {
        if (error.code === "P2002") {
            return (0, Respon_1.Respon)(409, false, [], "duplikat data", res);
        }
        next(error);
    }
});
exports.CreateMainBudgetController = CreateMainBudgetController;
const FindMainBudgetController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const token = req.token;
        if (req.params.userId !== token.userId) {
            throw Error("akses dilarang!");
        }
        const respon = yield (0, MainBudget_service_1.FindMainBudgetService)(req.params);
        if (respon === null) {
            return (0, Respon_1.Respon)(404, false, [], "budget tidak ditemukan!", res);
        }
        return (0, Respon_1.Respon)(200, true, respon, "success mengambil data!", res);
    }
    catch (error) {
        next(error);
    }
});
exports.FindMainBudgetController = FindMainBudgetController;
const DeleteMainBudgetController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const respon = yield (0, MainBudget_service_1.DeleteMainBudgetService)(req.params);
        return (0, Respon_1.Respon)(200, true, respon, "berhasil menghapus budget!", res);
    }
    catch (error) {
        if (error.code === "P2025") {
            return (0, Respon_1.Respon)(404, false, [], "budget tidak ditemukan!", res);
        }
        next(error);
    }
});
exports.DeleteMainBudgetController = DeleteMainBudgetController;
