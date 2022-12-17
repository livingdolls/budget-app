import { date, number, object, optional, string, TypeOf } from "zod";

const payload = {
	body: object({
		id_main_budget: optional(string()),
		maxBudget: number().min(0),
		userId: string(),
		create_at: optional(date()),
	}),
};

const params = {
	params: object({
		id_main_budget: string().min(30, { message: "budget tidak valid" }),
	}),
};

export const CreateMainBudgetSchema = object({
	...payload,
});

export const MainBudgetIdSchema = object({
	...params,
});

export type MainBudgetType = TypeOf<typeof CreateMainBudgetSchema>["body"];
export type MainBudgetIdType = TypeOf<typeof MainBudgetIdSchema>["params"];
