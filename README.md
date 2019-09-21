A shopping-cart API implemented using [express](https://expressjs.com/) and [Typescript](https://www.typescriptlang.org/).

## Build Instructions

* Install nodenv and node-build (or use any other way to put correct version of node on PATH) - https://github.com/nodenv/nodenv#installation and https://github.com/nodenv/node-build#installation.

* Install jq package using homebrew, apt-get, yum etc. (optional, but useful).

* Run this to install the right version of nodejs and start the server:

```
nodenv install $(cat .node-version) # or non-nodenv equivalent
npm install
npm start
```

* To access the API:

```
curl --verbose http://localhost:8080/cart | jq .
```

## IDE

* [Visual Studio Code](https://code.visualstudio.com/).

## Design

