import * as Joi from 'joi';

const shoppingListItem = Joi.object({
  name: Joi.string().not().empty().required(),
  purchased: Joi.boolean(),
});

export const shoppingListData = Joi.array().items(shoppingListItem);
