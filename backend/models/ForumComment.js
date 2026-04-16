import mongoose from 'mongoose';

const forumCommentSchema = new mongoose.Schema({
  topic_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'ForumTopic',
    required: true
  },
  comment: {
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
  collection: 'forum_comments',
  timestamps: false
});

forumCommentSchema.virtual('topic', {
  ref: 'ForumTopic',
  localField: 'topic_id',
  foreignField: '_id',
  justOne: true
});

forumCommentSchema.virtual('user', {
  ref: 'User',
  localField: 'user_id',
  foreignField: '_id',
  justOne: true
});

forumCommentSchema.set('toJSON', { virtuals: true });
forumCommentSchema.set('toObject', { virtuals: true });

export default mongoose.model('ForumComment', forumCommentSchema);
