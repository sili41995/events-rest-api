import express from 'express';
import { authenticate, validateBody, isValidId } from '../../middlewares';
import {
  getAll,
  add,
  getById,
  updateById,
  deleteById,
  getEventsByMonth,
} from '../../controllers/events';
import { addSchema } from '../../models/event';
import { validBodySchema } from '../../schemas';
import { Endpoints } from '../../constants';

const router = express.Router();

router.use(authenticate);

router.get(Endpoints.root, getAll);
router.post(
  Endpoints.root,
  validateBody(validBodySchema),
  validateBody(addSchema),
  add
);
router.get(Endpoints.monthly, getEventsByMonth);
router.get(`/:${Endpoints.eventId}`, isValidId, getById);
router.put(
  `/:${Endpoints.eventId}`,
  isValidId,
  validateBody(validBodySchema),
  updateById
);
router.delete(`/:${Endpoints.eventId}`, isValidId, deleteById);

export default router;
