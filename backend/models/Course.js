import mongoose from 'mongoose';

const courseSchema = new mongoose.Schema({
  course: {
    type: String,
    required: true
  },
  about: {
    type: String,
    default: ''
  }
}, {
  collection: 'courses',
  timestamps: false
});

courseSchema.virtual('alumni', {
  ref: 'AlumnusBio',
  localField: '_id',
  foreignField: 'course_id'
});

courseSchema.set('toJSON', { virtuals: true });
courseSchema.set('toObject', { virtuals: true });

export default mongoose.model('Course', courseSchema);
