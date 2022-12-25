import { MainBudget } from "@prisma/client";
import prisma from "../config/dbClient";
import {
	CreateMainBudget,
	DeleteMainBudget,
	MainBudgetWithUserType,
} from "../interfaces/MainBudget.interface";
import { MainBudgetType } from "../Types/MainBudget.type";

export const CreateMainBudgetService = (
	userId: Pick<MainBudgetType, "userId">
): CreateMainBudget => {
	const respon = prisma.mainBudget.create({
		data: {
			maxBudget: 0,
			userId: userId.userId,
		},
	});

	return respon;
};

export const FindMainBudgetService = (
	userId: Pick<MainBudgetType, "userId">
): MainBudgetWithUserType => {
	const respon = prisma.mainBudget.findUnique({
		where: {
			userId: userId.userId,
		},
		include: {
			user: {
				select: {
					id_user: true,
					nama: true,
					email: true,
				},
			},
		},
	});

	return respon;
};

export const DeleteMainBudgetService = (
	id: Pick<MainBudgetType, "id_main_budget">
): DeleteMainBudget => {
	const respon = prisma.mainBudget.delete({
		where: id,
	});

	return respon;
};

export const FindMainBudgetByIdService = async (
	idUser: Pick<MainBudgetType, "userId">
): Promise<MainBudget | null> => {
	const respon = await prisma.mainBudget.findUnique({
		where: {
			userId: idUser.userId,
		},
	});
	return respon;
};
