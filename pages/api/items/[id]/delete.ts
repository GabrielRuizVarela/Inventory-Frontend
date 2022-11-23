import { NextApiRequest, NextApiResponse } from 'next';
import { Item } from '../../..';
import { connect } from '../../../../conection';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  // check if is a delete request
  const { Item } = await connect();
  Item.findByIdAndRemove(req.query.id, (err: any, item: Item) => {
    if (err) {
      res.status(422).json({ err });
    } else {
      res.status(200).json({ item });
    }
  });
}
