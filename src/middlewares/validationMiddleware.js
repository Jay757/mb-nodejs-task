import { categorySchema, productSchema } from '../schemas/index.js';

const validate = (schema) => (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message);
    }
    next();
};

export const validateCategory = validate(categorySchema);
export const validateProduct = validate(productSchema);

