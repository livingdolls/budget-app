import { MainBudget, Prisma } from "@prisma/client";

export type MainBudgetWithUserType = Prisma.Prisma__MainBudgetClient<
	| (MainBudget & { user: { id_user: string; nama: string; email: string } })
	| null,
	null
>;

export type CreateMainBudget = Prisma.Prisma__MainBudgetClient<
	MainBudget,
	never
>;

export type DeleteMainBudget = Prisma.Prisma__MainBudgetClient<
	MainBudget,
	never
>;
