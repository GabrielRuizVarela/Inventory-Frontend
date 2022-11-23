import { NextApiRequest, NextApiResponse } from 'next';
import { Item } from '../../..';
import { connect } from '../../../../conection';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  // check if is a delete request
  console.log('hello?');
  if (req.method === 'DELETE') {
    const { Item } = await connect();
    const item = await Item.findByIdAndRemove(
      req.query.id,
      (err: any, item: Item) => {
        if (err) {
          res.status(422).json({ err });
        } else {
          res.status(200).json({ item });
        }
      },
    );
  }
}
