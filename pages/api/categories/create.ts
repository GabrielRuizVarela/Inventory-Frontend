import { NextApiRequest, NextApiResponse } from 'next';
import { connect } from '../../../conection';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { Category } = await connect();
  Category.create({
    name: req.body.name,
    description: req.body.description,
  })
    .then((category) => {
      res.status(201).json({ category });
    })
    .catch((err) => {
      res.status(422).json({ err });
    });
}
