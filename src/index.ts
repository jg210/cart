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

const router = express.Router();

router.route('/').get((_, res) => res.send(cart));

const app = express();
app.use(prefix, router);
app.listen(port, () => {
  console.log(`listening on port: ${port}`);
});

