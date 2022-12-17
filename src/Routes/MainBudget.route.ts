import express from "express";
import {
	CreateMainBudgetController,
	FindMainBudgetController,
} from "../Controllers/MainBudget.controller";

const route = express.Router();

route.post("/", CreateMainBudgetController);
route.get("/:userId", FindMainBudgetController);

export default route;
