import joi from 'joi'

export const addBrand = joi.object({
  name: joi.string().required().min(2).max(50).messages({
    'any.required': 'Brand name is required',
    'string.empty': 'Brand name cannot be empty',
    'string.max': 'Brand name must be less than or equal to 50 characters long',
    'string.min': 'Brand name must be at least 2 characters long',
  }),
})
