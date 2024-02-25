import { Schema, model } from 'mongoose';
import Joi from 'joi';
import { preUpdate, handleMongooseError } from './hooks';
import { ErrorMessages } from '../constants';
import { IEvent } from '../types/types';
import ModelNames from './modelNames';

const eventSchema = new Schema<IEvent>(
  {
    task: {
      type: String,
      required: [true, ErrorMessages.taskRequiredErr],
    },
    deadline: {
      type: String,
      required: [true, ErrorMessages.deadlineRequiredErr],
    },
    completed: {
      type: Boolean,
      default: false,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: ModelNames.user,
    },
  },
  { versionKey: false, timestamps: true }
);

eventSchema.pre('findOneAndUpdate', preUpdate);
eventSchema.post('save', handleMongooseError);
eventSchema.post('findOneAndUpdate', handleMongooseError);

const addSchema = Joi.object({
  task: Joi.string()
    .required()
    .messages({ 'any.required': ErrorMessages.taskRequiredErr }),
  deadline: Joi.string()
    .required()
    .messages({ 'any.required': ErrorMessages.deadlineRequiredErr }),
  completed: Joi.boolean(),
});

const Event = model<IEvent>(ModelNames.event, eventSchema);

export { Event, addSchema };
