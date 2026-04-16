import mongoose from 'mongoose';

const eventCommitSchema = new mongoose.Schema({
  event_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Event',
    required: true
  },
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, {
  collection: 'event_commits',
  timestamps: false
});

eventCommitSchema.virtual('event', {
  ref: 'Event',
  localField: 'event_id',
  foreignField: '_id',
  justOne: true
});

eventCommitSchema.virtual('user', {
  ref: 'User',
  localField: 'user_id',
  foreignField: '_id',
  justOne: true
});

eventCommitSchema.set('toJSON', { virtuals: true });
eventCommitSchema.set('toObject', { virtuals: true });

export default mongoose.model('EventCommit', eventCommitSchema);
