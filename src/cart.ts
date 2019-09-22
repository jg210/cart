import * as _ from 'lodash';

import { isNonNegativeIntegerString } from './util';

type ItemId = number;
export interface CartItem {
  title: string;
  price: number;
}
export type Cart = Record<ItemId, CartItem>;
export interface CartJson {
  items: Cart;
}

export function* idGenerator(cart: Cart): IterableIterator<number> {
  const ids = Object.keys(cart).map(key => parseInt(key));
  const maxId = _.max(ids);
  let nextId = (maxId === undefined) ? 0 : maxId + 1;
  while (true) {
    yield nextId++;
  }
}

export function isValidIdString(idString: string): boolean {
  return isNonNegativeIntegerString(idString);
}