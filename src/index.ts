import * as express from 'express';

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

function handleDeleteAll(res: express.Response): void {
  cart = {};
  // Return empty JSON in case want to return extra information later.
  res.json({});
}

// Configure express server's routes.
const router = express.Router();
router.route('/')
  .get((_, res) => handleListAll(res))
  .delete((_, res) => handleDeleteAll(res));

// Configure express server.
const port = 8080;
const prefix = "/cart";
const app = express();
app.use(prefix, router);
app.listen(port, () => {
  console.log(`listening on port: ${port}`);
});

