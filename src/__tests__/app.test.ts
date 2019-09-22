import { createApp } from '../app';
import * as supertest from 'supertest';

describe("the API", () => {

  let agent: supertest.SuperTest<supertest.Test>;

  beforeEach(() => {
    const app = createApp();
    agent = supertest.agent(app); 
  });

  it("contains default items", async () => {
    const result = await agent.get("/cart")
    expect(result.status).toBe(200);
    expect(result.type).toEqual("application/json");
    expect(result.body).toStrictEqual({
      "items": {
        "1": {
          "price": 999,
           "title": "fork handles"
          },
        "2": {
          "price": 298,
          "title": "plug"
        }
      }
    });
  });
});