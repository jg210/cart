import { createApp } from "./app";

const app = createApp([
  {
    title: "fork handles",
    price: 999
  },
  {
    title: "plug",
    price: 298
  }
]);
const port = 8080;
app.listen(port, () => {
  console.log(`listening on port: ${port}`);
});
