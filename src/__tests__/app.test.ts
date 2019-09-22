import { createApp } from '../app';
import * as supertest from 'supertest';
import { BAD_REQUEST, OK, NOT_FOUND, CREATED } from 'http-status-codes';
import { CartItem } from 'cart';

describe("the API", () => {

  let agent: supertest.SuperTest<supertest.Test>;

  async function getItems(agent: supertest.SuperTest<supertest.Test>): Promise<CartItem[]> {
    const result = await agent.get("/cart");
    expect(result.status).toBe(OK);
    expect(result.type).toEqual("application/json");
    return result.body.items;
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

  describe("has an add item endpoint", () => {

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
      const items = await getItems(agent);
      expect(items).toStrictEqual({ "0": {price, title}});
    });

  });

});