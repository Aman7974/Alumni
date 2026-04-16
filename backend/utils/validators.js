import Joi from 'joi';

// User validation schemas
export const userSchema = Joi.object({
  name: Joi.string().min(2).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  userType: Joi.string().valid('Admin', 'Alumnus', 'alumnus').required(),
  course_id: Joi.string().allow(null, '')
});

export const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required()
});

// Course schemas
export const courseSchema = Joi.object({
  course: Joi.string().required(),
  about: Joi.string().allow('').optional()
});

// Career schemas
export const careerSchema = Joi.object({
  company: Joi.string().required(),
  location: Joi.string().required(),
  job_title: Joi.string().required(),
  description: Joi.string().required(),
  user_id: Joi.string().required()
});

// Event schemas
export const eventSchema = Joi.object({
  title: Joi.string().required(),
  content: Joi.string().required(),
  schedule: Joi.date().required(),
  banner: Joi.string().allow('').optional()
});

// Forum topic schemas
export const forumTopicSchema = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().required(),
  user_id: Joi.string().required()
});

// Forum comment schemas
export const forumCommentSchema = Joi.object({
  c: Joi.string().required(),
  user_id: Joi.string().required()
});

// Gallery schemas
export const gallerySchema = Joi.object({
  about: Joi.string().required()
});

// Alumni bio schemas
export const alumnusBioSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  gender: Joi.string().valid('Male', 'Female', 'Other').allow(null),
  batch: Joi.number().allow(null),
  course_id: Joi.string().required(),
  connected_to: Joi.string().allow(null)
});

// Middleware factory for validation
export const validate = (schema) => (req, res, next) => {
  const { error } = schema.validate(req.body, { abortEarly: false });
  if (error) {
    const errors = error.details.map(detail => detail.message);
    return res.status(400).json({ error: 'Validation failed', details: errors });
  }
  next();
};
