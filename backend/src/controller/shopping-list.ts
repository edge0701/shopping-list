import ShoppingList from '../db/model/shopping-list';

interface GetListOpts {
  userId: number;
}

interface CreateListOpts {
  userId: number;
  data: object;
}

interface UpdateListOpts {
  id: number;
  data: object;
}

export const getList = async (opts: GetListOpts) => {
  return ShoppingList.findOne({
    where: {
      user_id: opts.userId,
    },
  });
};

export const createList = async (opts: CreateListOpts) => {
  return ShoppingList.create({
    user_id: opts.userId,
    data: opts.data,
  });
};

export const updateList = async (opts: UpdateListOpts) => {
  return ShoppingList.update({
    data: opts.data,
  }, {
    where: {
      id: opts.id,
    },
  });
};
