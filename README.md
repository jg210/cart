A node express server for a shopping cart.

## Build Instructions

Install nodenv and node-build (or use any other way to put correct version of node on PATH):

* https://github.com/nodenv/nodenv#installation
* https://github.com/nodenv/node-build#installation

Then run this:

```
nodenv install $(cat .node-version) # or equivalent
npm install
npm start
```

To access the API:

```
curl --verbose http://localhost:8080
```

## IDE

* [Visual Studio Code](https://code.visualstudio.com/) (VSC)

## Design

