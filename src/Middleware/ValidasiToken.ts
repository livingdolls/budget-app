import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

export interface CustomRequest extends Request {
	token: string;
}

export type IPatyload = {
	_id_user: string;
	exp: number;
};

export const VerifyToken = (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	// const token = req.cookies.refreshToken;
	const authHeader = req.headers["authorization"];
	const token = authHeader && authHeader.split(" ")[1];

	if (!token) throw Error("Akses dilarang");

	// TODO
	try {
		const tokenValidate = jwt.verify(
			token,
			process.env.JWT_TOKEN || "supersecret"
		) as IPatyload;

		(req as CustomRequest).token = tokenValidate._id_user;
		console.log(tokenValidate);

		next();
	} catch (error) {
		throw Error("token tidak valid");
	}
};

// export const RefreshToken = async (
// 	req: Request,
// 	res: Response,
// 	next: NextFunction
// ) => {
// 	try {
// 		const refreshToken = req.cookies.refreshToken;
// 		console.log(req.cookies.refreshToken);
// 		if (!refreshToken) res.sendStatus(401);

// 		const findUser: any = await getRefreshToken(refreshToken);
// 		if (findUser.length === 0) res.sendStatus(404);
// 		const { _id_user, nama, email, isSuperAdmin } = findUser[0];

// 		try {
// 			const refresh = jwt.verify(
// 				refreshToken,
// 				process.env.REFRESH_TOKEN || "refreshsupersecret"
// 			);

// 			const accessToken = jwt.sign(
// 				{ _id_user },
// 				process.env.TOKEN_SECRET || "supersecret",
// 				{ expiresIn: "25s" }
// 			);

// 			res.json({ accessToken });
// 		} catch (error) {
// 			res.sendStatus(403);
// 		}
// 	} catch (error: any) {
// 		throw new Error(error);
// 	}
// };
