import mongoose from 'mongoose';

const productCategorySchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    description: String,
    image: String,
  },
  { timestamps: true }
);

const ProductCategory = mongoose.models.ProductCategory || mongoose.model('ProductCategory', productCategorySchema);
export default ProductCategory;
