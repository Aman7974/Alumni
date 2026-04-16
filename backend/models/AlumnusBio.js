import mongoose from 'mongoose';

const alumnusBioSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  gender: {
    type: String,
    enum: ['Male', 'Female', 'Other', 'male', 'female', 'other'],
    default: null
  },
  batch: {
    type: Number,
    default: null
  },
  course_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course',
    required: true
  },
  email: {
    type: String,
    required: true,
    lowercase: true,
    trim: true
  },
  connected_to: {
    type: String,
    default: null
  },
  avatar: {
    type: String,
    default: null
  },
  status: {
    type: Boolean,
    default: false
  },
  date_created: {
    type: Date,
    default: Date.now
  }
}, {
  collection: 'alumnus_bio',
  timestamps: false
});

alumnusBioSchema.virtual('user', {
  ref: 'User',
  localField: '_id',
  foreignField: 'alumnus_id',
  justOne: true
});

alumnusBioSchema.set('toJSON', { virtuals: true });
alumnusBioSchema.set('toObject', { virtuals: true });

export default mongoose.model('AlumnusBio', alumnusBioSchema);
