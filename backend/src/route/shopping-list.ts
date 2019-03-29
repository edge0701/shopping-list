import * as express from 'express';

import { updateList } from '../controller/shopping-list';
import log from '../util/logger';
import { shoppingListData } from '../util/validation';

const router = express.Router();

router.post('/:id', async (req, res) => {
  try {
    const result = shoppingListData.validate(req.body.data);
    if (result.error) throw result.error;
    await updateList({
      id: req.params.id,
      data: req.body.data,
    });
    res.status(200).send({});
  } catch (err) {
    log.error(err);
    if (err.isJoi) {
      res.status(400).send({error: err.name, message: err.message});
    } else {
      res.status(500).send({error: 'InternalServerError'});
    }
  }
});

export default router;
