import { Prisma } from "@prisma/client";
import prisma from "../config/dbClient";
import {
	CreateMainBudget,
	MainBudgetWithUserType,
} from "../interfaces/MainBudget.interface";
import { MainBudgetType } from "../Types/MainBudget.type";

export const CreateMainBudgetService = (
	userId: Pick<MainBudgetType, "userId">
): CreateMainBudget => {
	const respon = prisma.MainBudget.create({
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
	const respon = prisma.MainBudget.findUnique({
		where: {
			userId: Number(userId.userId),
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
