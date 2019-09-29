import express = require('express');
import {
  NOT_FOUND,
  CREATED
} from 'http-status-codes';
import {
  Cart,
  CartItem,
  isValidIdString,
  idGenerator,
  ItemId
} from './cart';
import {
  badRequest,
} from './util';
import * as _ from 'lodash';

const prefix = "/cart";

function handleListAll(cart: Cart, res: express.Response): void {
  res.json(cart.listAll());
}

function handleAddItem(
    cart: Cart,
    req: express.Request,
    res: express.Response): void {
  const item = req.body.item;
  if (!item) {
    badRequest(res, "item key missing");
    return;
  }
  const title = req.body.item.title;
  const price = req.body.item.price;
  if (!title) {
    badRequest(res, "title missing");
    return;
  }
  if (typeof title !== 'string') {
    badRequest(res, "price is not a string");
    return;
  }
  if (price === undefined || price === null) {
    badRequest(res, "price missing");
    return;
  }
  if (typeof price !== 'number') {
    badRequest(res, "price is not a number");
  }
  if (price < 0) {
    badRequest(res, "negative price");
    return;
  }
  const cartItem: CartItem = {
    title, price
  };
  const id = cart.addItem(cartItem);
  res.status(CREATED);
  res.location(`${prefix}/${id}`); // TODO handle GET for these item URLs.
  res.json({
    id,
    item: cartItem
  });
}

function handleDeleteAll(cart: Cart, res: express.Response): void {
  cart.deleteAll();
  // Return empty JSON in case want to return extra information later.
  res.json({});
}

function handleItemDelete(
  cart: Cart,
    req: express.Request,
    res: express.Response): void {
  const idString = req.params.itemId;
  if (!isValidIdString(idString)) {
    badRequest(res, `invalid id: ${idString}`);
    return;
  }
  const id = parseInt(idString);
  const cartItem = cart.deleteItem(id);
  if (!cartItem) {
    res.status(NOT_FOUND);
  }
  res.json({
    item: cartItem // express removes "item" property if cartItem is undefined
  });
}

export function createApp(intialItems: CartItem[]): express.Express {
  const cart = new Cart(intialItems);
  const router = express.Router();
  router.route('/')
    .get((_, res) => handleListAll(cart, res))
    .post((req, res) => handleAddItem(cart, req, res))
    .delete((_, res) => handleDeleteAll(cart, res));
  router.route('/:itemId')
    .delete((req, res) => handleItemDelete(cart, req, res));
  const app = express();
  app.use(express.json()); // Parse requests as JSON.
  app.use(prefix, router);
  return app;
}