"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SchemaValidator = void 0;
const zod_1 = require("zod");
const SchemaValidator = (schema) => (req, res, next) => {
    try {
        schema.parse({
            body: req.body,
            params: req.params,
            query: req.query,
        });
        next();
    }
    catch (error) {
        if (error instanceof zod_1.ZodError) {
            return res.status(400).json(error.issues.map((issue) => ({
                path: issue.path,
                message: issue.message,
            })));
        }
        next(error);
    }
};
exports.SchemaValidator = SchemaValidator;
