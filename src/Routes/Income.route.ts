import express from "express";
import { CreateIncomeController } from "../Controllers/Income.controller";
import { SchemaValidator } from "../Middleware/Validator";
import { CreateIncomeSchema } from "../Types/Income.type";

const route = express.Router();

route.post("/", SchemaValidator(CreateIncomeSchema), CreateIncomeController);

export default route;
