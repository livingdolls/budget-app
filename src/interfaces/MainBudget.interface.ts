import { MainBudget, Prisma } from "@prisma/client";

export type MainBudgetWithUserType = Prisma.Prisma__MainBudgetClient<
	| (MainBudget & { user: { id_user: number; nama: string; email: string } })
	| null,
	null
>;

export type CreateMainBudget = Prisma.Prisma__MainBudgetClient<
	MainBudget,
	never
>;
