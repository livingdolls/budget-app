import { Credential, Prisma } from "@prisma/client";
import prisma from "../config/dbClient";
import { findUserCredential, RegisterUser } from "../interfaces/Auth.interface";
import { LoginType, RegisterType } from "../Types/Auth.type";

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
			credential: {
				create: {
					token: "supertoken",
				},
			},
		},
	});

	return newUser;
};

export const FindUserCredentialService = async (
	data: LoginType
): Promise<findUserCredential | null> => {
	const respon = await prisma.user.findUnique({
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
};

export const UpdateTokenService = async (
	id: string,
	token: string
): Promise<Credential> => {
	const respon = await prisma.credential.update({
		where: {
			id_credential: id,
		},
		data: {
			token: token,
		},
	});

	return respon;
};

export const FindRefreshToken = async (
	token: string
): Promise<Credential | null> => {
	const respon = await prisma.credential.findFirst({
		where: {
			token: token,
		},
	});

	return respon;
};

export const FindUserByIdService = async (id: string) => {
	const respon = await prisma.user.findUnique({
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
};
