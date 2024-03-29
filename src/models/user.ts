import { Schema, model } from 'mongoose';
import Joi from 'joi';
import { handleMongooseError, preUpdate } from './hooks';
import {
  ErrorMessages,
  regExp,
  ProfileSettings,
  DefaultAvatarsURL,
} from '../constants';
import { IUser } from '../types/types';
import ModelNames from './modelNames';

const { emailRegExp, notEmptyValueRegExp } = regExp;

const userSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: [true, ErrorMessages.nameRequiredErr],
    },
    email: {
      type: String,
      match: [emailRegExp, ErrorMessages.emailRegExpErr],
      required: [true, ErrorMessages.emailRequiredErr],
      unique: true,
    },
    password: {
      type: String,
      match: [notEmptyValueRegExp, ErrorMessages.emptyStringErr],
      minLength: [
        ProfileSettings.passMinLength,
        ErrorMessages.passwordMinLengthErr,
      ],
      required: [true, ErrorMessages.passwordRequiredErr],
    },
    token: {
      type: String,
      default: null,
    },
    avatar: {
      type: String,
      default: DefaultAvatarsURL.user,
    },
  },
  { versionKey: false, timestamps: true }
);

userSchema.pre('findOneAndUpdate', preUpdate);
userSchema.post('save', handleMongooseError);
userSchema.post('findOneAndUpdate', handleMongooseError);

const nameSettings = Joi.string().messages({
  'any.required': ErrorMessages.nameRequiredErr,
});

const emailSettings = Joi.string().pattern(emailRegExp).messages({
  'any.required': ErrorMessages.emailRequiredErr,
  'string.pattern.base': ErrorMessages.emailRegExpErr,
});

const passwordSettings = Joi.string()
  .pattern(notEmptyValueRegExp)
  .min(ProfileSettings.passMinLength)
  .max(ProfileSettings.passMaxLength)
  .messages({
    'any.required': ErrorMessages.passwordRequiredErr,
    'string.min': ErrorMessages.passwordMinLengthErr,
    'string.max': ErrorMessages.passwordMaxLengthErr,
    'string.pattern.base': ErrorMessages.emptyStringErr,
  });

const passwordRepeatSettings = Joi.string()
  .valid(Joi.ref('password'))
  .messages({
    'any.required': ErrorMessages.passwordRepeatRequiredErr,
    'any.only': ErrorMessages.passwordRepeatErr,
  });

const signUpSchema = Joi.object({
  name: nameSettings.required(),
  email: emailSettings.required(),
  password: passwordSettings.required(),
  passwordRepeat: passwordRepeatSettings.required(),
});

const signInSchema = Joi.object({
  email: emailSettings.required(),
  password: passwordSettings.required(),
});

const updateProfileSchema = Joi.object({
  password: passwordSettings,
  passwordRepeat: Joi.string().when('password', {
    is: String,
    then: passwordRepeatSettings.required(),
  }),
  passwordOutdated: passwordSettings,
  name: Joi.string().pattern(notEmptyValueRegExp).messages({
    'string.empty': ErrorMessages.emptyStringErr,
  }),
  email: emailSettings,
})
  .min(1)
  .messages({
    'object.min': ErrorMessages.missingFieldsErr,
  });

const User = model<IUser>(ModelNames.user, userSchema);

export { User, signUpSchema, signInSchema, updateProfileSchema };
