import { Schema, model } from 'mongoose';
import Joi from 'joi';
import { preUpdate, handleMongooseError } from './hooks';
import { regExp, ErrorMessages } from '../constants';
import { IEvent } from '../types/types';

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

const Event = model<IEvent>('event', eventSchema);

export { Event, addSchema };
