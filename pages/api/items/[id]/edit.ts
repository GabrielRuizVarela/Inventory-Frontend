import { NextApiRequest, NextApiResponse } from 'next';
import { connect } from '../../../../conection';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { Item } = await connect();
  Item.findByIdAndUpdate(req.query.id, req.body, (err: any, item: any) => {
    if (err) {
      res.status(422).json({ err });
    } else {
      res.status(200).json({ item });
    }
  });
}
