import { ForumTopic, ForumComment, User } from '../models/Index.js';

export async function listForums(req, res, next) {
    try {
        const forums = await ForumTopic.find().populate({ path: 'user_id', select: 'name' }).sort({ _id: -1 });
        res.json(forums);
    } catch (err) { next(err); }
}

export async function addForum(req, res, next) {
    try {
        const topic = await ForumTopic.create(req.body);
        res.status(201).json(topic);
    } catch (err) { next(err); }
}

export async function updateForum(req, res, next) {
    try {
        await ForumTopic.findByIdAndUpdate(req.params.id, req.body);
        res.json({ message: 'Updated' });
    } catch (err) { next(err); }
}

export async function deleteForum(req, res, next) {
    try {
        await ForumTopic.findByIdAndDelete(req.params.id);
        res.json({ message: 'Deleted' });
    } catch (err) { next(err); }
}

export async function listComments(req, res, next) {
  try {
    const comments = await ForumComment.find({ topic_id: req.params.topicId })
      .populate({ path: 'user_id', select: 'name' })
      .sort({ _id: 1 });
    res.json(comments);
  } catch (err) {
    next(err);
  }
}


export async function addComment(req, res, next) {
  try {
    const payload = {
      comment:  req.body.c,
      user_id:  req.body.user_id,
      topic_id: req.params.topicId
    };
    const comment = await ForumComment.create(payload);
    res.status(201).json(comment);
  } catch (err) {
    next(err);
  }
}

export async function updateComment(req, res, next) {
    try {
        await ForumComment.findByIdAndUpdate(req.params.id, req.body);
        res.json({ message: 'Updated' });
    } catch (err) { next(err); }
}

export async function deleteComment(req, res, next) {
    try {
        await ForumComment.findByIdAndDelete(req.params.id);
        res.json({ message: 'Deleted' });
    } catch (err) { next(err); }
}
