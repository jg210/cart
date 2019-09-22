import { createApp } from "./app";

const app = createApp();
const port = 8080;
app.listen(port, () => {
  console.log(`listening on port: ${port}`);
});
