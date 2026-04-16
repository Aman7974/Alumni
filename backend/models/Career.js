import mongoose from 'mongoose';

const careerSchema = new mongoose.Schema({
  company: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  job_title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  date_created: {
    type: Date,
    default: Date.now
  }
}, {
  collection: 'careers',
  timestamps: false
});

careerSchema.virtual('user', {
  ref: 'User',
  localField: 'user_id',
  foreignField: '_id',
  justOne: true
});

careerSchema.set('toJSON', { virtuals: true });
careerSchema.set('toObject', { virtuals: true });

export default mongoose.model('Career', careerSchema);
