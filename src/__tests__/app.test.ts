import { createApp } from '../app';
import * as supertest from 'supertest';
import { BAD_REQUEST, OK, NOT_FOUND, CREATED } from 'http-status-codes';
import { CartItem, Cart } from 'cart';

describe("the API", () => {

  let agent: supertest.SuperTest<supertest.Test>;

  async function getItems(agent: supertest.SuperTest<supertest.Test>): Promise<CartItem[]> {
    const result = await agent.get("/cart");
    expect(result.status).toBe(OK);
    expect(result.type).toEqual("application/json");
    return result.body.items;
  }

  async function expectItems(_expectedItems: Cart): Promise<void> {
    const actualItems = await getItems(agent);
    expect(actualItems).toStrictEqual(_expectedItems);
  }

  async function addAllToEmptyCart(items: CartItem[]): Promise<void> {
    const expectedCart: Cart = {};
    items.forEach(async (expectedItem, i) => {
      const request = agent.post("/cart");
      const { title, price } = expectedItem;
      const item = { price, title };
      request.send({ item }); 
      const result = await request;
      expect(result.status).toBe(CREATED);
      expectedCart[i] = item;
    });
    expectItems(expectedCart);
  }

  beforeEach(() => {
    const initialCart = {};
    const app = createApp(initialCart);
    agent = supertest.agent(app); 
  });

  it("handles unknown paths", async () => {
    const result = await agent.get("/unknown");
    expect(result.status).toBe(NOT_FOUND);
  });

  it("contains default items", async () => {
    const items = await getItems(agent);
    expect(items).toStrictEqual({});
  });

  describe("has an add-item endpoint", () => {

    it("expects item key in json", async () => {
      const request = agent.post("/cart");
      request.send({});
      const result = await request;
      expect(result.status).toBe(BAD_REQUEST);
    });

    it("expects item json to have keys", async () => {
      const request = agent.post("/cart");
      request.send({ item: {}});
      const result = await request;
      expect(result.status).toBe(BAD_REQUEST);
    });

    it("expects item json to have keys", async () => {
      const request = agent.post("/cart");
      request.send({ item: {}});
      const result = await request;
      expect(result.status).toBe(BAD_REQUEST);
    });

    it("expects item json to have price key", async () => {
      const request = agent.post("/cart");
      request.send({ item: { title: "apple" }});
      const result = await request;
      expect(result.status).toBe(BAD_REQUEST);
    });

    it("expects item json to have title key", async () => {
      const request = agent.post("/cart");
      request.send({ item: { price: 123 }});
      const result = await request;
      expect(result.status).toBe(BAD_REQUEST);
    });

    it("expects title to be a string", async () => {
      const request = agent.post("/cart");
      request.send({ item: { title: 345, price: 123 }});
      const result = await request;
      expect(result.status).toBe(BAD_REQUEST);
    });

    it("expects price to be a number", async () => {
      const request = agent.post("/cart");
      request.send({ item: { title: "apple", price: "123" }});
      const result = await request;
      expect(result.status).toBe(BAD_REQUEST);
    });

    it("expects price to be a positive number", async () => {
      const request = agent.post("/cart");
      request.send({ item: { title: "apple", price: -123 }});
      const result = await request;
      expect(result.status).toBe(BAD_REQUEST);
    });

    it("allows an item to be added", async () => {
      const request = agent.post("/cart");
      const title = "apple";
      const price = 123;
      request.send({ item: { price, title }});
      const result = await request;
      expect(result.status).toBe(CREATED);
      expect(result.body).toStrictEqual({
        "id": 0,
        "item": {
          price,
          title
        },
      });
      await expectItems({ "0": {price, title}});
    });

  });

  describe("has a remove all items endpoint", () => {

    it("removes all items", async () => {
      const items = [
        { title: "apple", price: 1},
        { title: "orange", price: 2},
        { title: "pear", price: 3}
      ];
      addAllToEmptyCart(items);
      const result = await agent.delete("/cart");
      expect(result.status).toBe(OK);
      await expectItems({});
    });

  });

  describe("has a remove one item endpoint", () => {

    it("removes one item", async () => {
      const items = [
        { title: "apple", price: 1},
        { title: "orange", price: 2},
        { title: "pear", price: 3}
      ];
      addAllToEmptyCart(items);
      const result1 = await agent.delete("/cart/1");
      expect(result1.status).toBe(OK);
      await expectItems({
        "0": {"price": 1, "title": "apple"},
        "2": {"price": 3, "title": "pear"}
      });
      const result2 = await agent.delete("/cart/1");
      expect(result2.status).toBe(NOT_FOUND);
    });

    it("handles removal of absent item", async () => {
      const result = await agent.delete("/cart/1");
      expect(result.status).toBe(NOT_FOUND);
    });

    it("handles deletion of item with non-numeric id", async () => {
      const result = await agent.delete("/cart/abc");
      expect(result.status).toBe(BAD_REQUEST);
    });

  });

});