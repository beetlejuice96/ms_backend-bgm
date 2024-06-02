import * as Joi from 'joi';

export const validationSchema = Joi.object({
  PORT: Joi.number().required(),
  AUTH_SERVICE_BASE_URL: Joi.string().required(),
  REDIS_HOST: Joi.string().required(),
  REDIS_PORT: Joi.number().required(),
  REDIS_PASSWORD: Joi.string().required(),
});
