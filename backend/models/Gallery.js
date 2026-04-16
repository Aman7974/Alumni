import mongoose from 'mongoose';

const gallerySchema = new mongoose.Schema({
  image_path: {
    type: String,
    required: true
  },
  about: {
    type: String,
    required: true
  },
  created: {
    type: Date,
    default: Date.now
  }
}, {
  collection: 'gallery',
  timestamps: false
});

export default mongoose.model('Gallery', gallerySchema);
