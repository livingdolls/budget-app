import { NextFunction, Request, Response } from "express";
import { DeleteUserMany, RegisterUserService } from "../Services/Auth.service";
import { RegisterType } from "../Types/Auth.type";
import { HashString } from "../Utils/HashPassword";
import { Respon } from "../Utils/Respon";

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
