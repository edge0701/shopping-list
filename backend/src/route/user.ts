import * as express from 'express';

import { createList, getList } from '../controller/shopping-list';
import log from '../util/logger';
import { shoppingListData } from '../util/validation';

const router = express.Router();

router.get('/:id/shopping-list', async (req, res) => {
  try {
    const list = await getList({
      userId: req.params.id,
    });
    res.send(list || {});
  } catch (err) {
    log.error(err);
    res.status(500).send({});
  }
});

router.put('/:id/shopping-list', async (req, res) => {
  try {
    const result = shoppingListData.validate(req.body.data);
    if (result.error) throw result.error;

    const list = await createList({
      userId: req.params.id,
      data: req.body.data,
    });
    res.status(200).send({id: list.id});
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
