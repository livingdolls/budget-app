import { Expense, ExpensePlan } from "@prisma/client";

export type ExpenseEx = ExpensePlan & { Expense: Expense[] };
