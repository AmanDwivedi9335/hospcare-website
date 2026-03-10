import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema(
  {
    number: {
      type: Number,
      required: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    mainImage: {
      type: String,
      required: true,
    },
    videoLink: {
      type: String,
    },
    portfolioImages: {
      type: [String],
      default: [],
    },
  },
  { timestamps: true }
);

const Project = mongoose.models.Project || mongoose.model('Project', projectSchema);
export default Project;
