const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const tutorSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, 'Username is required'],
      trim: true,
      minlength: [3, 'Username must be at least 3 characters long'],
      maxlength: [30, 'Username must be at most 30 characters long'],
    },
    emailAddress: {
      type: String,
      required: [true, 'Email Address is required'],
      unique: true,
      lowercase: true,
      trim: true,
      match: [
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
        'Please fill a valid email address',
      ],
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
      minlength: [6, 'Password must be at least 6 characters long'],
      select: false, // Exclude password from query results by default
    },
    phone: {
      type: String,
      trim: true,
      match: [
        /^\+?[0-9]{1,15}$/,
        'Please fill a valid phone number with country code',
      ],
    },
    profilePhoto: {
      type: String,
      trim: true,
      match: [
        /^(https?:\/\/.*\.(?:png|jpg|jpeg|gif|svg))$/i,
        'Please fill a valid URL for the profile photo',
      ],
    },
  
    isPredefined: {
      type: Boolean,
      default: false, // Indicate if the user was created from predefined credentials
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
  }
);

// Pre-save hook to hash password before saving
tutorSchema.pre('save', async function (next) {
  const tutor = this;

  // Only hash the password if it has been modified or is new
  if (!tutor.isModified('password')) {
    return next();
  }

  try {
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    tutor.password = await bcrypt.hash(tutor.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Method to compare passwords
tutorSchema.methods.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model('Tutors', tutorSchema);
