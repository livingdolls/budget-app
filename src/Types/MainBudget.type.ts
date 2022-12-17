import { date, number, object, optional, TypeOf } from "zod";

const payload = {
	body: object({
		id_main_budget: optional(number()),
		maxBudget: number().min(0),
		userId: number(),
		create_at: optional(date()),
	}),
};

export const CreateMainBudgetSchema = object({
	...payload,
});

export type MainBudgetType = TypeOf<typeof CreateMainBudgetSchema>["body"];
