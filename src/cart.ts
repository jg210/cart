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

export function findNextId(cart: Cart): number {
  const ids = Object.keys(cart).map(key => parseInt(key));
  const maxId = _.max(ids);
  return (maxId === undefined) ? 0 : maxId + 1;
}

export function isValidIdString(idString: string): boolean {
  return isNonNegativeIntegerString(idString);
}