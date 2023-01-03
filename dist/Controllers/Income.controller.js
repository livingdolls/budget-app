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
exports.ViewIncomeController = exports.UpdateIncomeController = exports.DeleteIncomeController = exports.CreateIncomeController = void 0;
const Income_service_1 = require("../Services/Income.service");
const Respon_1 = require("../Utils/Respon");
const CreateIncomeController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const respon = yield (0, Income_service_1.CreateIncomeService)(req.params, req.body);
        return (0, Respon_1.Respon)(200, true, respon, "berhasil menambah income", res);
    }
    catch (error) {
        next(error);
    }
});
exports.CreateIncomeController = CreateIncomeController;
const DeleteIncomeController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const respon = yield (0, Income_service_1.DeleteIncomeService)(req.params);
        return (0, Respon_1.Respon)(200, true, respon, "berhasil menghapus income", res);
    }
    catch (error) {
        next(error);
    }
});
exports.DeleteIncomeController = DeleteIncomeController;
const UpdateIncomeController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const respon = yield (0, Income_service_1.UpdateIncomeService)(req.params, req.body);
        (0, Respon_1.Respon)(200, true, respon, "berhasil memperbaharui income", res);
    }
    catch (error) {
        next(error);
    }
});
exports.UpdateIncomeController = UpdateIncomeController;
const ViewIncomeController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const respon = yield (0, Income_service_1.ViewIncomeService)(req.params);
        (0, Respon_1.Respon)(200, true, respon, "berhasil mendapatkan data", res);
    }
    catch (error) {
        next(error);
    }
});
exports.ViewIncomeController = ViewIncomeController;
