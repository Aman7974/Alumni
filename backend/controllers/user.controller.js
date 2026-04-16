import User from '../models/User.js';
import bcrypt from 'bcrypt';

export async function listUsers(req, res, next) {
    try {
        const users = await User.find().select('-password');
        res.json(users);
    } catch (err) {
        next(err);
    }
}

export async function updateUser(req, res, next) {
    try {
        const { name, email, type, password } = req.body;
        const updateData = { name, email, type };

        if (password) {
            updateData.password = await bcrypt.hash(password, 10);
        }

        const user = await User.findByIdAndUpdate(req.params.id, updateData, { new: true }).select('-password');
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.json(user);
    } catch (err) {
        next(err);
    }
}

export async function deleteUser(req, res, next) {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.json({ message: 'User deleted successfully' });
    } catch (err) {
        next(err);
    }
}
