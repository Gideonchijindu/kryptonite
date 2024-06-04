import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const notificationSchema = new Schema(
  {
    note: { type: String, default: '' },
    is_read: { type: Boolean, default: false },
    link: { type: String, default: '' },
    user_id: { type: Schema.Types.ObjectId, ref: 'User' }
  },
  { timestamps: true }
);

export default model('Notifications', notificationSchema);