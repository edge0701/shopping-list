import { ShoppingListItem } from '../../components/shopping-list/list-item';
import { get, post, put } from './common';

export interface CreateListRequest {
  data: ShoppingListItem[];
}

export const getList = async (userId: number) => {
  return await get(`/user/${userId}/shopping-list`);
};

export const createList = async (userId: number, data: CreateListRequest) => {
  return await put(`/user/${userId}/shopping-list`, data);
};

export const updateList = async (listId: number, data: CreateListRequest) => {
  return await post(`/shopping-list/${listId}`, data);
};
