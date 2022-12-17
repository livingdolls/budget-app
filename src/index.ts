import bodyParser from "body-parser";
import express, { NextFunction, Request, Response } from "express";
import helmet from "helmet";
import morgan from "morgan";
import cors from "cors";
import dotenv from "dotenv";
import AuthRoute from "./Routes/Auth.route";
import MainBudgetRoute from "./Routes/MainBudget.route";

const app = express();

// Dependen
dotenv.config();
app.use(bodyParser.json());
app.use(morgan("dev"));
app.use(helmet());
app.use(cors());

// Route
app.use("/api/v1/auth", AuthRoute);
app.use("/api/v1/mainBudget", MainBudgetRoute);

// HandleError
interface StatusError extends Error {
	status?: number;
}

app.use(
	(
		err: StatusError,
		req: Request,
		res: Response,
		next: NextFunction
	): Response => {
		const errorStatus: number = err.status || 500;
		const errorMessage: string = err.message || "Ada sesuatu yang salah!";

		return res.status(errorStatus).json({
			success: false,
			status: errorStatus,
			message: errorMessage,
			stack: err.stack,
		});
	}
);

const Port = process.env.APP_PORT || 3001;
app.listen(Port, () => {
	console.log("Connect to backend port = ", Port);
});
