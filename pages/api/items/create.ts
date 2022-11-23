import { NextApiRequest, NextApiResponse } from 'next';
import { connect } from '../../../conection';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  // Get the data from the request
  const { name, stock, price, img_url, description, category } = req.body;
  console.log(req.body);
  // Connect to the database
  const { Item } = await connect();
  const item = await Item.create({
    name,
    stock,
    price,
    img_url,
    description,
    category,
  })
    .then((item) => {
      res.status(200).json({ item });
    })
    .catch((err) => {
      res.status(422).json({ err });
    });
}
