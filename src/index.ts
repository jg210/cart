import * as express from 'express';

const app = express();
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

app.listen(port, () => {
  console.log(`listening on port: ${port}`);
});

app.get(`${prefix}`, (_, res) => res.send(cart));