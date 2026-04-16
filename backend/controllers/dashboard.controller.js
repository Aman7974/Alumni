import { ForumTopic, Career, Event, AlumnusBio } from '../models/Index.js';

export async function getCounts(req, res, next) {
  try {
    const [ forumCount, jobCount, eventCount, alumniCount ] = await Promise.all([
      ForumTopic.countDocuments(),
      Career.countDocuments(),
      Event.countDocuments(),
      AlumnusBio.countDocuments()
    ]);

    // Count upcoming events (schedule >= now)
    const upEventCount = await Event.countDocuments({ schedule: { $gte: new Date() } });

    res.json({
      forums: forumCount,
      jobs: jobCount,
      events: eventCount,
      upevents: upEventCount,
      alumni: alumniCount
    });
  } catch (err) {
    next(err);
  }
}
