import * as express from 'express';
import {
  BAD_REQUEST,
  NOT_FOUND
} from 'http-status-codes';
import * as _ from 'lodash';

type ItemId = number;

interface CartItem {
  title: string;
  price: number;
}

type Cart = Record<ItemId,CartItem>;

interface CartJson {
  items: Cart;
}

let cart: Cart = {
  1: {
    title: "fork handles",
    price: 999
  },
  2: {
    title: "plug",
    price: 298
  }
};
let nextId = findNextId(cart);

function isValidIdString(idString: string): boolean {
  return !!idString.match(/^[1-9]*[0-9]$/);
}

function findNextId(cart: Cart) {
  const ids = Object.keys(cart).map(key => parseInt(key));
  const maxId = _.max(ids);
  return (maxId === undefined) ? 0 : maxId + 1;
}

// JSON response listing all items in the cart.
function cartJson(): CartJson {
  return {
    // Using "items" key here allows extra information to
    // be added to the API later.
    items: cart
  };
}

function handleListAll(res: express.Response): void {
  res.json(cartJson());
}

function handleAddItem(
    req: express.Request,
    res: express.Response): void {
  // TODO handle missing item in json.
  const title = req.body.item.title;
  const priceString = req.body.item.price;
  const price = parseInt(priceString); // TODO handle parsing errors.
  // TODO handle negative price.
  const cartItem: CartItem = {
    title, price
  };
  const id = nextId++;
  cart[id] = cartItem;
  res.json({ id });
}

function handleDeleteAll(res: express.Response): void {
  cart = {};
  // Return empty JSON in case want to return extra information later.
  res.json({});
}

// TODO Test non-numeric deletion.
// TODO Test deletion of item that is present.
// TODO Test deletion of item that is absent.
function handleItemDelete(
    req: express.Request,
    res: express.Response): void {
  const idString = req.params.itemId;
  if (!isValidIdString(idString)) {
    res.status(BAD_REQUEST);
    res.send(`invalid id: ${idString}`);
    return;
  }
  const id = parseInt(idString);
  const cartItem = cart[id];
  res.json({
    item: cartItem // express removes "item" property if cartItem is undefined
  });
  if (!cartItem) {
    res.status(NOT_FOUND);
  } else {
    delete cart[id];
  }
}

// Configure express server's routes.
const router = express.Router();
router.route('/')
  .get((_, res) => handleListAll(res))
  .post((req, res) => handleAddItem(req, res))
  .delete((_, res) => handleDeleteAll(res));
router.route('/:itemId')
  .delete((req, res) => handleItemDelete(req, res));

// Configure express server.
const port = 8080;
const prefix = "/cart";
const app = express();
app.use(express.json()); // Parse requests as JSON.
app.use(prefix, router);
app.listen(port, () => {
  console.log(`listening on port: ${port}`);
});
