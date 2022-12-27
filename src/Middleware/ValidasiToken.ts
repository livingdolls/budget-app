import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { FindRefreshToken } from "../Services/Auth.service";

declare global {
	namespace Express {
		export interface Request {
			token: IPatyload;
		}
	}
}

export type IPatyload = {
	credentialId: string;
	userId: string;
	exp: number;
};

export const VerifyToken = (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const authHeader = req.headers["authorization"];
	const token = authHeader && authHeader.split(" ")[1];

	if (!token) return res.sendStatus(401);

	// TODO
	try {
		const tokenValidate = jwt.verify(
			token,
			process.env.JWT_TOKEN || "supersecret"
		) as IPatyload;

		req.token = tokenValidate;

		next();
	} catch (error) {
		return res.sendStatus(403);
	}
};

export const RefreshToken = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const refreshToken = req.cookies.token_budget;
		if (!refreshToken) res.sendStatus(401);

		const findToken = await FindRefreshToken(refreshToken);

		if (findToken === null) {
			res.sendStatus(401);
			throw Error("user tidak valid");
		}

		try {
			const refresh = jwt.verify(
				refreshToken,
				process.env.REFRESH_JWT || "refreshsupersecret"
			);

			const accessToken = jwt.sign(
				findToken,
				process.env.JWT_TOKEN || "supersecret",
				{ expiresIn: "25s", noTimestamp: true }
			);

			res.json({ accessToken });
		} catch (error) {
			res.sendStatus(403);
		}
	} catch (error: any) {
		throw new Error(error);
	}
};
