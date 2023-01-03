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
exports.helperDelete = exports.getUserController = exports.LoginUserController = exports.RegisterUserController = void 0;
const Auth_service_1 = require("../Services/Auth.service");
const EmptyDb_1 = require("../Utils/EmptyDb");
const HashPassword_1 = require("../Utils/HashPassword");
const Respon_1 = require("../Utils/Respon");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const RegisterUserController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { password, nama, email } = req.body;
        const hashPassword = (0, HashPassword_1.HashString)(password);
        const User = {
            nama,
            email,
            password: hashPassword,
        };
        const respon = yield (0, Auth_service_1.RegisterUserService)(User);
        return (0, Respon_1.Respon)(201, true, respon, `success created user ${respon.nama}`, res);
    }
    catch (error) {
        if (error.code === "P2002") {
            return (0, Respon_1.Respon)(409, false, [], "Email sudah terdaftar!, silahkan login.", res);
        }
        next(error);
    }
});
exports.RegisterUserController = RegisterUserController;
const LoginUserController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // cari user
        const findEmail = yield (0, Auth_service_1.FindUserCredentialService)(req.body);
        if (findEmail === null) {
            res.status(401).json("email tidak ditemukan");
            throw new Error("email tidak ditemukan");
        }
        const comparePass = yield (0, HashPassword_1.ComparePassword)(req.body.password, findEmail.password);
        if (!comparePass) {
            res.status(401).json("kata sandi salah!");
            throw new Error("Kata sandi salah");
        }
        // End Validasi
        const jwt_token = process.env.JWT_TOKEN || "supersecret";
        const jwt_refresh = process.env.REFRESH_JWT || "refreshsupersecret";
        if (findEmail.credential === null)
            throw new Error("credential tidak valid");
        const data = {
            credentialId: findEmail.credential.id_credential,
            userId: findEmail.credential.userId,
        };
        const signToken = jsonwebtoken_1.default.sign(data, jwt_token, {
            expiresIn: "1d",
            noTimestamp: true,
        });
        const refreshToken = jsonwebtoken_1.default.sign(data, jwt_refresh, {
            expiresIn: "30d",
            noTimestamp: true,
        });
        const updateToken = yield (0, Auth_service_1.UpdateTokenService)(data.credentialId, refreshToken);
        // setCookies
        res.cookie("token_budget", refreshToken, {
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000,
            secure: false,
        });
        res.json({ signToken });
    }
    catch (error) {
        next(error);
    }
});
exports.LoginUserController = LoginUserController;
const getUserController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const respon = yield (0, Auth_service_1.FindUserByIdService)(req.params.idUser);
        return (0, Respon_1.Respon)(201, true, respon, "success get user", res);
    }
    catch (error) {
        next(error);
    }
});
exports.getUserController = getUserController;
const helperDelete = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const emp = yield (0, EmptyDb_1.EmptyDb)();
    }
    catch (error) {
        console.log(error);
    }
});
exports.helperDelete = helperDelete;
