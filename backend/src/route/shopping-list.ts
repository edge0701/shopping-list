import * as express from 'express';

import { updateList } from '../controller/shopping-list';
import log from '../util/logger';

const router = express.Router();

router.post('/:id', async (req, res) => {
  try {
    await updateList({
      id: req.params.id,
      data: req.body.data,
    });
    res.status(200).send();
  } catch (err) {
    log.error(err);
    res.status(500).send();
  }
});

export default router;
