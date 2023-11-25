import express, { Express, Request, Response } from 'express';
import { getData } from '.';

export const app: Express = express();

app.use(express.json());
app.get('/', async (req: Request, res: Response) => {
  const data = await getData();

  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify({ data: data }));
});
