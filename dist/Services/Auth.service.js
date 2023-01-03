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
exports.FindUserByIdService = exports.FindRefreshToken = exports.UpdateTokenService = exports.FindUserCredentialService = exports.RegisterUserService = void 0;
const dbClient_1 = __importDefault(require("../config/dbClient"));
const RegisterUserService = (data) => {
    const newUser = dbClient_1.default.user.create({
        data: {
            nama: data.nama,
            email: data.email,
            password: data.password,
            main_budget: {
                create: {
                    maxBudget: 0,
                },
            },
            credential: {
                create: {
                    token: "supertoken",
                },
            },
        },
    });
    return newUser;
};
exports.RegisterUserService = RegisterUserService;
const FindUserCredentialService = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const respon = yield dbClient_1.default.user.findUnique({
        where: {
            email: data.email,
        },
        select: {
            email: true,
            password: true,
            credential: true,
        },
    });
    return respon;
});
exports.FindUserCredentialService = FindUserCredentialService;
const UpdateTokenService = (id, token) => __awaiter(void 0, void 0, void 0, function* () {
    const respon = yield dbClient_1.default.credential.update({
        where: {
            id_credential: id,
        },
        data: {
            token: token,
        },
    });
    return respon;
});
exports.UpdateTokenService = UpdateTokenService;
const FindRefreshToken = (token) => __awaiter(void 0, void 0, void 0, function* () {
    const respon = yield dbClient_1.default.credential.findFirst({
        where: {
            token: token,
        },
    });
    return respon;
});
exports.FindRefreshToken = FindRefreshToken;
const FindUserByIdService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const respon = yield dbClient_1.default.user.findUnique({
        where: {
            id_user: id,
        },
        select: {
            id_user: true,
            nama: true,
            email: true,
        },
    });
    return respon;
});
exports.FindUserByIdService = FindUserByIdService;
