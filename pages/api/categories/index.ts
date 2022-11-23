import { connect } from '../../../conection';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { Category } = await connect();
  const categories = await Category.find().sort({ name: 1 });
  res.status(200).json({ categories });
}
