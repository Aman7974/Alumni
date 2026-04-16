import mongoose from 'mongoose';

const eventSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  schedule: {
    type: Date,
    required: true
  },
  banner: {
    type: String,
    default: ''
  },
  date_created: {
    type: Date,
    default: Date.now
  }
}, {
  collection: 'events',
  timestamps: false
});

eventSchema.virtual('commits', {
  ref: 'EventCommit',
  localField: '_id',
  foreignField: 'event_id'
});

eventSchema.set('toJSON', { virtuals: true });
eventSchema.set('toObject', { virtuals: true });

export default mongoose.model('Event', eventSchema);
