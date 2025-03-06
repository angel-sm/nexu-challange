import Joi from 'joi';

export const fields = {
  id: Joi.number().positive().description('Unique identifier'),
  name: Joi.string().min(2).max(100).trim(),
  average_price: Joi.number()
    .positive()
    .greater(100000)
    .error(new Error('Price allowed greater than 100,000'))
    .description('Price allowed greater than 100,000'),
} as const;

export const filters = {
  greater: Joi.number().positive(),
  lower: Joi.number().positive(),
};

export const CreateBrandSchema = Joi.object({
  name: fields.name.required(),
});

export const createModelSchema = Joi.object({
  name: fields.name.required(),
  average_price: fields.average_price.optional(),
  id: fields.id.required(),
});

export const updateModelSchema = Joi.object({
  average_price: fields.average_price.required(),
  id: fields.id.required(),
});

export const idParamSchema = Joi.object({
  id: fields.id.required(),
});

export const filterParamsSchema = Joi.object(filters);
