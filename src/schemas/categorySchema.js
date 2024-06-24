import Joi from 'joi';

const categorySchema = Joi.object({
    name: Joi.string().min(3).required()
});

export default categorySchema