import Joi from 'joi';

export const userSchema = Joi.object({
  _id: Joi.string().optional(),
  _rev: Joi.string().optional(),
  type: Joi.string().valid('user').optional(),
  name: Joi.string().min(3).max(50).optional(),
  email: Joi.string().email().optional(),
  passwordHash: Joi.string().min(8).optional(),
  role: Joi.string().valid('administrator', 'admin', 'member', 'user').optional(),
  fullName: Joi.string().min(5).max(100).optional(),
  createdAt: Joi.string().isoDate().optional(),
  updatedAt: Joi.string().isoDate().optional(),
});
