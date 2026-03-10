import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    name:{
        type:String,
        required:true,
    },
    firstName: {
      type: String,
    },
    lastName: {
      type: String,
    },
    mobile: {
      type: String,
    },
    firmName: {
      type: String,
    },
    gstin: {
      type: String,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      validate: {
        validator: function (value) {
          return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
        },
        message: (props) => `${props.value} is not a valid email address!`,
      },
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    role: {
      type: String,
      enum: ['admin', 'user', 'dealer'],
      default: 'user',
    },
  },
  { timestamps: true }
);


const User = mongoose.models.User || mongoose.model('User', userSchema);

export default User;
