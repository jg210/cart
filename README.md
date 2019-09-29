A shopping-cart API implemented using [express](https://expressjs.com/) and [Typescript](https://www.typescriptlang.org/). Items are persisted in memory.

[![CircleCI](https://circleci.com/gh/jg210/cart.svg?style=svg)](https://circleci.com/gh/jg210/cart)

## Build Instructions

* Install [nodenv](https://github.com/nodenv/nodenv#installation) and [node-build](https://github.com/nodenv/node-build#installation) (or use any other way to put correct version of node on PATH).

* Optionally, install jq package using homebrew, apt-get, yum etc. This is not required, but is useful for making the json returned by the API readable.

* Run this to install the right version of node and start the cart API server:

```sh
nodenv install $(cat .node-version) # or non-nodenv equivalent
npm install
npm start
```

* To access the API:

```sh
curl --verbose http://localhost:8080/cart # list all
curl --verbose -H "Content-Type: application/json" -d '{"item": {"title": "pumps", "price": 1999}}' http://localhost:8080/cart # add item
curl --verbose -X DELETE http://localhost:8080/cart # delete all
curl --verbose -X DELETE http://localhost:8080/cart/1 # delete by id
```

* To use jq to pretty print the output from curl, append `| jq .` to the above commands.

## Unit Tests

```
npm test
```

## IDE

* [Visual Studio Code](https://code.visualstudio.com/).
