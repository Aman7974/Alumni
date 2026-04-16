import mongoose from 'mongoose';

const forumTopicSchema = new mongoose.Schema({
  title: {
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
  collection: 'forum_topics',
  timestamps: false
});

forumTopicSchema.virtual('comments', {
  ref: 'ForumComment',
  localField: '_id',
  foreignField: 'topic_id'
});

forumTopicSchema.virtual('user', {
  ref: 'User',
  localField: 'user_id',
  foreignField: '_id',
  justOne: true
});

forumTopicSchema.set('toJSON', { virtuals: true });
forumTopicSchema.set('toObject', { virtuals: true });

export default mongoose.model('ForumTopic', forumTopicSchema);
