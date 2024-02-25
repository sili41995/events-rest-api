import express from 'express';
import { authenticate, validateBody, isValidId } from '../../middlewares';
// import {
//   add,
//   getById,
//   updateById,
//   deleteById,
//   getTodaysProgress,
//   getMonthProgress,
// } from '../../controllers/hydrationEntries';
import { addSchema } from '../../models/event';
import { validBodySchema } from '../../schemas';

const router = express.Router();

router.use(authenticate);

router.post('/', validateBody(validBodySchema), validateBody(addSchema), add);
router.get('/:month', getEventsByMonth);
router.get('/:eventId', isValidId, getById);
router.put(
  '/:entryId',
  isValidId,
  validateBody(notEmptyBodySchema),
  updateById
);
router.delete('/:eventId', isValidId, deleteById);

export default router;
