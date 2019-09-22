import * as express from 'express';
import { BAD_REQUEST } from 'http-status-codes';

export function isNonNegativeIntegerString(string: string): boolean {
  return !!string.match(/^[1-9]*[0-9]$/);
}

export function badRequest(res: express.Response, message: string): void {
  res.status(BAD_REQUEST);
  res.send(message);
}