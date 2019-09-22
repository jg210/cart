import { createApp } from '../app';
import * as supertest from 'supertest';
import { OK } from 'http-status-codes';
import * as _ from 'lodash';
import * as express from 'express';

describe("the API", () => {

  let agent: supertest.SuperTest<supertest.Test>;

  beforeEach(() => {
    const app = createApp();
    agent = supertest.agent(app); 
  });

  it("can be started", () => {
    expect(_.max([1,2,3])).toBe(3);
    const foo = express();
    //agent.get("/cart").expect(OK, {});

  });
});