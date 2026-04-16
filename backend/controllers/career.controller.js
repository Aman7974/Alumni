import { Career, User } from '../models/Index.js';

export async function listCareers(req, res, next) {
  try {
    const careers = await Career.find().populate({ path: 'user_id', select: 'name' }).sort({ _id: -1 });
    res.json(careers);
  } catch (err) { next(err); }
}

export async function addCareer(req, res, next) {
  try {
    const career = await Career.create(req.body);
    res.status(201).json(career);
  } catch (err) { next(err); }
}

export async function updateCareer(req, res, next) {
  try {
    await Career.findByIdAndUpdate(req.params.id, req.body);
    res.json({ message: 'Updated' });
  } catch (err) { next(err); }
}

export async function deleteCareer(req, res, next) {
  try {
    await Career.findByIdAndDelete(req.params.id);
    res.json({ message: 'Deleted' });
  } catch (err) { next(err); }
}
