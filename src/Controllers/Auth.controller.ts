import { NextFunction, Request, Response } from "express";
import {
	FindUserCredentialService,
	RegisterUserService,
	UpdateTokenService,
} from "../Services/Auth.service";
import { LoginType, RegisterType } from "../Types/Auth.type";
import { EmptyDb } from "../Utils/EmptyDb";
import { HashString, ComparePassword } from "../Utils/HashPassword";
import { Respon } from "../Utils/Respon";
import jwt from "jsonwebtoken";

export const RegisterUserController = async (
	req: Request<{}, {}, RegisterType>,
	res: Response,
	next: NextFunction
) => {
	try {
		const { password, nama, email } = req.body;
		const hashPassword = HashString(password);
		const User = {
			nama,
			email,
			password: hashPassword,
		};

		const respon = await RegisterUserService(User);

		return Respon(
			201,
			true,
			respon,
			`success created user ${respon.nama}`,
			res
		);
	} catch (error: any) {
		if (error.code === "P2002") {
			return console.log("email sudah ada!");
		}
		next(error);
	}
};

export const LoginUserController = async (
	req: Request<{}, {}, LoginType>,
	res: Response,
	next: NextFunction
) => {
	try {
		// console.log(req.body);
		// cari user
		const findEmail = await FindUserCredentialService(req.body);
		if (findEmail === null) {
			throw new Error("email tidak ditemukan");
		}

		const comparePass = await ComparePassword(
			req.body.password,
			findEmail.password
		);

		if (!comparePass) throw new Error("Kata sandi salah");
		// End Validasi

		const jwt_token = process.env.JWT_TOKEN || "supersecret";
		const jwt_refresh = process.env.REFRESH_JWT || "refreshsupersecret";

		if (findEmail.credential === null)
			throw new Error("credential tidak valid");

		const data = {
			credentialId: findEmail.credential.id_credential,
			userId: findEmail.credential.userId,
		};

		const signToken = jwt.sign(data, jwt_token, {
			expiresIn: "1d",
			noTimestamp: true,
		});

		const refreshToken = jwt.sign(data, jwt_refresh, {
			expiresIn: "30d",
			noTimestamp: true,
		});

		const updateToken = await UpdateTokenService(
			data.credentialId,
			refreshToken
		);

		// setCookies
		res.cookie("token_budget", refreshToken, {
			httpOnly: true,
			maxAge: 24 * 60 * 60 * 1000,
			secure: false,
		});

		res.json({ signToken });
	} catch (error) {
		console.log(error);
	}
};

export const helperDelete = async () => {
	try {
		const emp = await EmptyDb();
	} catch (error) {
		console.log(error);
	}
};
