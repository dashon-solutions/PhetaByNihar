import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  id: { type: String, required: true }, // e.g. "01", "02"
  name: { type: String, required: true },
  marathiName: { type: String, required: false },
  subtitle: { type: String, required: true },
  image: { type: String, required: true },
  description: { type: String, required: true }
});

export const Product = mongoose.model('Product', productSchema);
