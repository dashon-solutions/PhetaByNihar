import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  id: { type: String, required: true }, // e.g. "01", "02"
  name: { type: String, required: true },
  marathiName: { type: String, required: false },
  subtitle: { type: String, required: true },
  price: { type: Number, required: false, default: null },
  image: { type: String, required: true },
  galleryImages: { type: [String], default: [] },
  description: { type: String, required: true },
  information: { type: String, required: false }
});

export const Product = mongoose.model('Product', productSchema);
