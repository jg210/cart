import express = require('express');
import {
  NOT_FOUND,
  CREATED
} from 'http-status-codes';
import {
  Cart,
  CartItem,
  isValidIdString,
  idGenerator
} from './cart';
import {
  badRequest,
  isNonNegativeIntegerString
} from './util';
import * as _ from 'lodash';

const prefix = "/cart";

function handleListAll(cart: Cart, res: express.Response): void {
  res.json({
    // Using "items" key here allows extra information to
    // be added to the API later.
    items: cart
  });
}

function handleAddItem(
    cart: Cart,
    idIterator: Iterator<number>,
    req: express.Request,
    res: express.Response): void {
  const item = req.body.item;
  if (!item) {
    badRequest(res, "item key missing");
    return;
  }
  const title = req.body.item.title;
  const priceString = req.body.item.price;
    if (!title) {
    badRequest(res, "title missing");
    return;
  }
  if (!priceString) {
    badRequest(res, "price missing");
    return;
  }
  if (!isNonNegativeIntegerString(priceString)) {
    badRequest(res, "non-negative integer price expected");
    return;
  }
  const price = parseInt(priceString);
  const cartItem: CartItem = {
    title, price
  };
  const id = idIterator.next().value;
  cart[id] = cartItem;
  res.status(CREATED);
  res.location(`${prefix}/${id}`); // TODO handle GET for these item URLs.
  res.json({
    id,
    item: cartItem
  });
}

function handleDeleteAll(cart: Cart, res: express.Response): void {
  cart = {}; // TODO fix.
  // Return empty JSON in case want to return extra information later.
  res.json({});
}

// TODO Test non-numeric deletion.
// TODO Test deletion of item that is present.
// TODO Test deletion of item that is absent.
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
  const cartItem = cart[id];
  if (!cartItem) {
    res.status(NOT_FOUND);
  } else {
    delete cart[id];
  }
  res.json({
    item: cartItem // express removes "item" property if cartItem is undefined
  });
}

export function createApp(intialCart: Cart): express.Express {
  const cart = _.cloneDeep(intialCart);
  const idIterator = idGenerator(cart);
  const router = express.Router();
  router.route('/')
    .get((_, res) => handleListAll(cart, res))
    .post((req, res) => handleAddItem(cart, idIterator, req, res))
    .delete((_, res) => handleDeleteAll(cart, res));
  router.route('/:itemId')
    .delete((req, res) => handleItemDelete(cart, req, res));
  const app = express();
  app.use(express.json()); // Parse requests as JSON.
  app.use(prefix, router);
  return app;
}