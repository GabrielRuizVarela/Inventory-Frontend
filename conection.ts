import mongoose, { Model } from 'mongoose';

// CONNECTING TO MONGOOSE (Get Database Url from .env.local)
const { MONGODB_URI } = process.env;

const Schema = mongoose.Schema;

// connection function
export const connect = async () => {
  const conn = await mongoose
    .connect(MONGODB_URI as string)
    .catch((err) => console.log(err));
  console.log('Mongoose Connection Established');

  // OUR TODO MODEL

  const ItemSchema = new Schema({
    name: {
      type: String,
      required: true,
    },
    stock: {
      type: Number,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    img_url: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: 'Category',
      required: true,
    },
  });

  const CategorySchema = new Schema({
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
  });

  const Item = mongoose.models.Item || mongoose.model('Item', ItemSchema);
  const Category =
    mongoose.models.Category || mongoose.model('Category', CategorySchema);

  return { conn, Item, Category };
};
