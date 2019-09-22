import { createApp } from "./app";
import { Cart } from 'cart';

const cart: Cart = {
  1: {
    title: "fork handles",
    price: 999
  },
  2: {
    title: "plug",
    price: 298
  }
};
const app = createApp(cart);
const port = 8080;
app.listen(port, () => {
  console.log(`listening on port: ${port}`);
});
