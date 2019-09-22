A shopping-cart API implemented using [express](https://expressjs.com/) and [Typescript](https://www.typescriptlang.org/).

## Build Instructions

* Install [nodenv](https://github.com/nodenv/nodenv#installation) and [node-build](https://github.com/nodenv/node-build#installation) (or use any other way to put correct version of node on PATH).

* Install jq package using homebrew, apt-get, yum etc. (optional, but useful).

* Run this to install the right version of node and start the cart API server:

```sh
nodenv install $(cat .node-version) # or non-nodenv equivalent
npm install
npm start
```

* To access the API:

```sh
curl --verbose http://localhost:8080/cart | jq .
```

## IDE

* [Visual Studio Code](https://code.visualstudio.com/).

## Design
