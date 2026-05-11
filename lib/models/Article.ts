import mongoose, { Schema, Document } from 'mongoose';

export interface IArticle extends Document {
  title: string;
  description: string;
  category: string;
  images: string[];
  createdAt: Date;
  updatedAt: Date;
}

const ArticleSchema = new Schema<IArticle>(
  {
    title: {
      type: String,
      required: [true, 'Please provide an article title'],
      trim: true,
      maxlength: [200, 'Title cannot be more than 200 characters'],
    },
    description: {
      type: String,
      required: [true, 'Please provide a description'],
      maxlength: [5000, 'Description cannot be more than 5000 characters'],
    },
    category: {
      type: String,
      required: [true, 'Please provide a category'],
      enum: ['Research', 'Health', 'Corporate', 'News'],
      default: 'Research',
    },
    images: {
      type: [String],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Article || mongoose.model<IArticle>('Article', ArticleSchema);
