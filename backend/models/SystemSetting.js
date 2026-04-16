import mongoose from 'mongoose';

const systemSettingSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    lowercase: true,
    trim: true
  },
  contact: {
    type: String,
    required: true
  },
  cover_img: {
    type: String,
    required: true
  },
  about_content: {
    type: String,
    required: true
  }
}, {
  collection: 'system_settings',
  timestamps: false
});

export default mongoose.model('SystemSetting', systemSettingSchema);
