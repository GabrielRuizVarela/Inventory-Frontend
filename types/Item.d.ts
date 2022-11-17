export type Item = {
  _id: string;
  name: string;
  price: number;
  stock: number;
  description: string;
  img_url: string;
  category: {
    _id: string;
    name: string;
    description: string;
  };
};