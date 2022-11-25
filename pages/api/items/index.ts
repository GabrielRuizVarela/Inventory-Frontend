import { NextApiRequest, NextApiResponse } from 'next';

import { connect } from '../../../conection';

export default async function handler(
  req: NextApiRequest,

  res: NextApiResponse,
) {
  console.log(req);
  const { Item } = await connect();
  Item.find()
    .populate('category')
    .exec((err, items) => {
      if (err) {
        res.status(422).json({ err });
      } else {
        res.status(200).json({ items });
      }
    });
}
