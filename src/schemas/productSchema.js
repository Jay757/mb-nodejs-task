import Joi from 'joi';

const productSchema = Joi.object({
    title: Joi.string().min(3).required(),
    description: Joi.string().optional(),
    price: Joi.number().greater(0).required(),
    category: Joi.string().required()
});

export default productSchema