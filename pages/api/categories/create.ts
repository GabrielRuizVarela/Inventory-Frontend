import { NextApiRequest, NextApiResponse } from 'next';
import { connect } from '../../../conection';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  console.log(req.body);
  const { Category } = await connect();
  const category = await Category.create(
    {
      name: req.body.name,
      description: req.body.description,
    },
    (err: any, category: any) => {
      if (err) {
        res.status(422).json({ err });
      } else {
        res.status(200).json({ category });
      }
    },
  );
}
