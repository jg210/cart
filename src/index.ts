import * as express from 'express';

const port = 8080;
const prefix = "/cart";

const cart = {
  1: {
    title: "fork handles",
    price: 999
  },
  2: {
    title: "plug",
    price: 298
  }
}

// JSON response listing all items in the cart.
function cartJson() {
  return {
    // Using "items" key here allows extra information to
    // be added to the API later.
    items: cart
  }
}

const router = express.Router();

router.route('/').get((_, res) => res.json(cartJson()));

const app = express();
app.use(prefix, router);
app.listen(port, () => {
  console.log(`listening on port: ${port}`);
});

