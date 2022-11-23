import { NextApiRequest, NextApiResponse } from 'next';

import { connect } from '../../../conection';

export default async function handler(
  req: NextApiRequest,

  res: NextApiResponse,
) {
  const { Item } = await connect();

  const items = await Item.find().populate('category');

  res.status(200).json({ items });
}
