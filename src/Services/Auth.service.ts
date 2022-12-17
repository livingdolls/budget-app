import prisma from "../config/dbClient";
import { RegisterType } from "../Types/Auth.type";

export const RegisterUserService = async (
	data: RegisterType
): Promise<Omit<RegisterType, "id" | "token">> => {
	const newUser = await prisma.user.create({
		data: data,
	});
	return newUser;
};

export const DeleteUserMany = async () => {
	const del = await prisma.user.deleteMany();
	console.log(del);
};
