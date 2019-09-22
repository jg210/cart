import * as express from 'express';
import { BAD_REQUEST } from 'http-status-codes';

export function badRequest(res: express.Response, message: string): void {
  res.status(BAD_REQUEST);
  res.send(message);
}