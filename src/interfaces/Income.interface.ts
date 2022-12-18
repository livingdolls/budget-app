import { Income, MainBudget } from "@prisma/client";

export type BudgetIncome = MainBudget & { income: Income[] };
