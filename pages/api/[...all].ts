import { NextApiRequest, NextApiResponse } from 'next';
import httpProxyMiddleware from 'next-http-proxy-middleware';

export default (req: NextApiRequest, res: NextApiResponse) =>
  httpProxyMiddleware(req, res, {
    // You can use the `http-proxy` option
    target: 'https://inventory-backend-production.up.railway.app/',
    // In addition, you can use the `pathRewrite` option provided by `next-http-proxy`
    pathRewrite: [
      {
        patternStr: '^/api/items',
        replaceStr: 'items',
      },
      {
        patternStr: '^/api/categories',
        replaceStr: 'categories',
      },
      // {
      // // Rewrite the path
      // '^/api/google': 'https://google.com',
      // '^/api/myhome': 'https://github.com/stegano',
      // },
    ],
  });
