import bcrypt from 'bcrypt';
import path from 'path';
import { User, AlumnusBio } from '../models/Index.js';
import { isValidObjectId } from 'mongoose';

export async function listUsers(req, res, next) {
  try {
    const users = await User.find().sort({ name: 1 });
    res.json(users);
  } catch (err) { next(err); }
}

export async function updateUser(req, res, next) {
  try {
    const { name, email, type, password } = req.body;
    const updates = { name, email, type };
    if (password) {
      updates.password = await bcrypt.hash(password, 10);
    }
    await User.findByIdAndUpdate(req.params.id, updates);
    res.json({ message: 'User updated' });
  } catch (err) { next(err); }
}

export async function deleteUser(req, res, next) {
  try {
    const id = req.params.id;
    // if this user is an alumnus, delete their bio first
    const user = await User.findById(id);
    if (user && user.alumnus_id) {
      await AlumnusBio.findByIdAndDelete(user.alumnus_id);
    }
    await User.findByIdAndDelete(id);
    res.json({ message: 'User deleted' });
  } catch (err) { next(err); }
}

export async function alumniList(req, res, next) {
  try {
    const list = await AlumnusBio.find().sort({ name: 1 });
    res.json(list);
  } catch (err) {
    next(err);
  }
}

export async function alumnus(req, res, next) {
  try {
    const record = await AlumnusBio.findById(req.params.id);
    res.json(record);
  } catch (err) {
    next(err);
  }
}

export async function updateAlumnusStatus(req, res, next) {
  try {
    await AlumnusBio.findByIdAndUpdate(req.body.id, { status: req.body.status });
    res.json({ message: 'Status updated' });
  } catch (err) {
    next(err);
  }
}

export async function deleteAlumnus(req, res, next) {
  try {
    await AlumnusBio.findByIdAndDelete(req.params.id);
    res.json({ message: 'Deleted' });
  } catch (err) {
    next(err);
  }
}

export async function updateAccount(req, res, next) {
  console.log("update acccccccccc");
  try {
    console.log("SERVER");
    // Build bio update payload
    const bioData = {
      name: req.body.name,
      email: req.body.email,
      gender: req.body.gender,
      batch: parseInt(req.body.batch, 10),
      course_id: req.body.course_id,
      connected_to: req.body.connected_to,
    };
    if (req.file) {
      const fullPath = req.file.path;
      const relPath = path.relative(process.cwd(), fullPath);
      bioData.avatar = relPath.replace(/\\/g, '/');
    }

    // Update alumnus_bio row
    await AlumnusBio.findByIdAndUpdate(req.body.alumnus_id, bioData);

    // Build user update payload
    const userData = { name: req.body.name, email: req.body.email };
    if (req.body.password) {
      const hashed = await bcrypt.hash(req.body.password, 10);
      userData.password = hashed;
    }

    // Update users row
    await User.findByIdAndUpdate(req.body.user_id, userData);

    res.json({ message: 'Account updated successfully' });
  } catch (err) {
    next(err);
  }
}
