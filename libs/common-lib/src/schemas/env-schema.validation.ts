import * as Joi from 'joi';

export const EnvJoiSchema = Joi.object({
  DATABASE_TYPE: Joi.string().required().default('postgres'),
  DATABASE_HOST: Joi.string().required(),
  DATABASE_PORT: Joi.number().required().default(5432),
  DATABASE_USERNAME: Joi.string().required(),
  DATABASE_PASSWORD: Joi.string().required(),
  DATABASE_DATABASE: Joi.string().required(),
  APPLICATION_PORT: Joi.number().required().default(3000),
  EMAIL: Joi.string().required(),
  PASSWORD: Joi.string().required(),
});
