import { setupServer } from 'msw/node'
import { rest } from 'msw';
import MockProducts from './MockProducts';
import handlers from './handlers';
// This configures a request mocking server with the given request handlers.
export const server = setupServer(...handlers);