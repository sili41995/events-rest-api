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
    completed: {
      type: Boolean,
      default: false,
    },
    deadline: {
      type: String,
      required: [true, ErrorMessages.deadlineRequiredErr],
    },
  },
  { versionKey: false, timestamps: true }
);
