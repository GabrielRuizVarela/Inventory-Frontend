import { NextApiRequest, NextApiResponse } from 'next';
import { connect } from '../../../../conection';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === 'DELETE') {
    const { Category } = await connect();
    const category = await Category.findByIdAndRemove(
      req.query.id,
      (err: any, category: any) => {
        if (err) {
          res.status(422).json({ err });
        } else {
          res.status(200).json({ category });
        }
      },
    );
  }
}
