import { rest } from "msw";
import MockProducts from "./MockProducts";

const handlers = [
    rest.get('https://fakestoreapi.com/products', (req, res, ctx) => {
        return res(ctx.status(200) ,ctx.json(MockProducts))
      }), 
      rest.post('https://fakestoreapi.com/products', (req, res, ctx) => {
        return res(ctx.status(200) ,ctx.json({ id : 0 }))
      })
];

export default handlers;