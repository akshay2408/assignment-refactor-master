import { setupServer } from 'msw/node'
import { rest } from 'msw';
import MockProducts from './MockProducts';
// This configures a request mocking server with the given request handlers.
export const server = setupServer(rest.get('https://fakestoreapi.com/products', (req, res, ctx) => {
    return res(ctx.status(200) ,ctx.json(MockProducts))
  }));