import { NextApiRequest, NextApiResponse } from 'next';
import { connect } from '../../../../conection';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { Item } = await connect();

  const item = await Item.findById(req.query.id)
    .populate('category')
    .then((item) => {
      res.status(200).json({ item });
    })
    .catch((err) => {
      res.status(422).json({ err });
    });
}
