import Joi from 'joi';
import { ErrorMessages } from '../constants';

const validBodySchema = Joi.object().min(1).messages({
  'object.min': ErrorMessages.missingFieldsErr,
});

export default validBodySchema;
