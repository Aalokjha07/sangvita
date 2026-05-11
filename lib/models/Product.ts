import mongoose, { Schema, Document } from 'mongoose';

export interface IProduct extends Document {
  name: string;
  category: string;
  price: number;
  mrp: number;
  description: string;
  images: string[];
  tag: string | null;
  createdAt: Date;
  updatedAt: Date;
}

const ProductSchema = new Schema<IProduct>(
  {
    name: {
      type: String,
      required: [true, 'Please provide a product name'],
      trim: true,
      maxlength: [100, 'Name cannot be more than 100 characters'],
    },
    category: {
      type: String,
      required: [true, 'Please provide a category'],
      trim: true,
    },
    price: {
      type: Number,
      required: [true, 'Please provide a price'],
    },
    mrp: {
      type: Number,
      required: [true, 'Please provide an MRP'],
    },
    description: {
      type: String,
      required: [true, 'Please provide a description'],
      maxlength: [1000, 'Description cannot be more than 1000 characters'],
    },
    images: {
      type: [String],
      default: [],
    },
    tag: {
      type: String,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Product || mongoose.model<IProduct>('Product', ProductSchema);