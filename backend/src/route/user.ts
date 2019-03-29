import * as express from 'express';

import { createList, getList } from '../controller/shopping-list';
import log from '../util/logger';

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
    const list = await createList({
      userId: req.params.id,
      data: req.body.data,
    });
    res.status(200).send({id: list.id});
  } catch (err) {
    log.error(err);
    res.status(500).send({});
  }
});

export default router;
