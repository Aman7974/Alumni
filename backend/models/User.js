import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    required: true
  },
  type: {
    type: String,
    default: 'Alumnus',
    enum: ['Admin', 'Alumnus', 'admin', 'alumnus']
  },
  alumnus_id: {
    type: Number,
    default: 0
  }
}, {
  collection: 'users',
  timestamps: false
});

// Virtual for population
userSchema.virtual('bio', {
  ref: 'AlumnusBio',
  localField: 'alumnus_id',
  foreignField: '_id',
  justOne: true
});

// Include virtuals in JSON output
userSchema.set('toJSON', { virtuals: true });
userSchema.set('toObject', { virtuals: true });

export default mongoose.model('User', userSchema);
