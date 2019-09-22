import { createApp } from '../app';
import * as supertest from 'supertest';
import { OK } from 'http-status-codes';

describe("the API", () => {

  let agent: supertest.SuperTest<supertest.Test>;

  beforeEach(() => {
    const app = createApp();
    agent = supertest.agent(app); 
  });

  it("can be started", () => {
    agent.get("/cart").expect(OK, {});
  });
});