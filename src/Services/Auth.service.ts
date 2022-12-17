import prisma from "../config/dbClient";
import { RegisterUser } from "../interfaces/Auth.interface";
import { RegisterType } from "../Types/Auth.type";

export const RegisterUserService = (data: RegisterType): RegisterUser => {
	const newUser = prisma.user.create({
		data: {
			nama: data.nama,
			email: data.email,
			password: data.password,
			main_budget: {
				create: {
					maxBudget: 0,
				},
			},
		},
	});
	return newUser;
};
